# Migration Testing Plan

This document describes how to test the migration fixes locally before deploying to production.

## Prerequisites

- PostgreSQL installed locally
- Node.js 20.x
- Access to a test database

## Test Scenario 1: Fresh Database (New Installation)

This tests the migration on a completely new database.

```bash
# 1. Create a fresh test database
createdb istudy_test

# 2. Set the DATABASE_URL
export DATABASE_URL="postgresql://localhost:5432/istudy_test"

# 3. Run all migrations
npm run db:migrate

# 4. Verify the result
npm run verify-db

# 5. Expected result: All migrations applied successfully, all tables created

# 6. Clean up
dropdb istudy_test
```

## Test Scenario 2: Existing Database (Simulating Production)

This tests the migration on a database that might have the old schema.

```bash
# 1. Create test database
createdb istudy_test_existing

# 2. Set DATABASE_URL
export DATABASE_URL="postgresql://localhost:5432/istudy_test_existing"

# 3. Apply only the first 3 migrations (simulate old production state)
npx prisma migrate resolve --applied 20260117125403_init
npx prisma migrate resolve --applied 20260117130520_add_user
npx prisma migrate resolve --applied 20260118152235_add_user_and_note_relation

# 4. Manually create the old schema with the problematic unique index
psql $DATABASE_URL << 'EOF'
-- This simulates the old production schema
CREATE TABLE IF NOT EXISTS "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "resetToken" TEXT,
    "resetTokenExpires" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "User_email_key" ON "User"("email");
CREATE UNIQUE INDEX IF NOT EXISTS "User_resetToken_key" ON "User"("resetToken");

CREATE TABLE IF NOT EXISTS "Note" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" INTEGER,
    CONSTRAINT "Note_pkey" PRIMARY KEY ("id")
);

ALTER TABLE "Note" ADD CONSTRAINT IF NOT EXISTS "Note_userId_fkey" 
FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
EOF

# 5. Insert test data with NULL resetTokens (simulating multiple users)
psql $DATABASE_URL << 'EOF'
INSERT INTO "User" (name, email, "passwordHash", "resetToken", "updatedAt")
VALUES 
  ('User 1', 'user1@test.com', 'hash1', NULL, NOW()),
  ('User 2', 'user2@test.com', 'hash2', NULL, NOW()),
  ('User 3', 'user3@test.com', 'hash3', NULL, NOW());
EOF

# 6. Now try to apply the problematic migration
npm run db:migrate

# 7. Verify success
npm run verify-db

# 8. Check that the User_resetToken_key index was dropped
psql $DATABASE_URL -c "\d User"

# 9. Check that role_id column was added
psql $DATABASE_URL -c "SELECT column_name FROM information_schema.columns WHERE table_name = 'User';"

# 10. Check that roles table was created
psql $DATABASE_URL -c "\dt roles"

# 11. Expected result: Migration succeeds, no errors

# 12. Clean up
dropdb istudy_test_existing
```

## Test Scenario 3: Idempotency Test

This tests that the migration can be run multiple times without errors.

```bash
# 1. Create test database and apply migrations
createdb istudy_test_idempotent
export DATABASE_URL="postgresql://localhost:5432/istudy_test_idempotent"
npm run db:migrate

# 2. Mark the last migration as not applied to test re-running it
psql $DATABASE_URL << 'EOF'
DELETE FROM "_prisma_migrations" 
WHERE migration_name = '20260201135908_update_user_token';
EOF

# 3. Run migrations again
npm run db:migrate

# 4. Expected result: No errors, migration applies successfully again

# 5. Verify database state
npm run verify-db

# 6. Clean up
dropdb istudy_test_idempotent
```

## Test Scenario 4: Emergency Fix Script

Test the emergency fix SQL script.

```bash
# 1. Create a database in a problematic state
createdb istudy_test_emergency
export DATABASE_URL="postgresql://localhost:5432/istudy_test_emergency"

# 2. Set up minimal schema
psql $DATABASE_URL << 'EOF'
CREATE TABLE "User" (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    "passwordHash" TEXT NOT NULL,
    "resetToken" TEXT,
    "resetTokenExpires" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

CREATE UNIQUE INDEX "User_resetToken_key" ON "User"("resetToken");

CREATE TABLE "Note" (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE "_prisma_migrations" (
    id TEXT PRIMARY KEY,
    checksum TEXT NOT NULL,
    finished_at TIMESTAMP(3),
    migration_name TEXT NOT NULL,
    logs TEXT,
    rolled_back_at TIMESTAMP(3),
    started_at TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    applied_steps_count INTEGER NOT NULL DEFAULT 0
);
EOF

# 3. Run the emergency fix script
psql $DATABASE_URL < prisma/migrations/EMERGENCY_FIX.sql

# 4. Verify success
npm run verify-db

# 5. Check that all changes were applied
psql $DATABASE_URL << 'EOF'
-- Should show no User_resetToken_key
SELECT indexname FROM pg_indexes WHERE tablename = 'User';

-- Should show role_id column
SELECT column_name FROM information_schema.columns WHERE table_name = 'User';

-- Should show roles table
\dt roles

-- Should show the migration as complete
SELECT migration_name, finished_at FROM "_prisma_migrations";
EOF

# 6. Expected result: All checks pass

# 7. Clean up
dropdb istudy_test_emergency
```

## Test Scenario 5: Production-like Test with Data

Test with realistic production data including multiple NULL resetTokens.

```bash
# 1. Set up database
createdb istudy_test_prod_like
export DATABASE_URL="postgresql://localhost:5432/istudy_test_prod_like"

# 2. Apply first 3 migrations
npx prisma migrate deploy

# 3. Mark last migration as not applied
psql $DATABASE_URL -c "DELETE FROM \"_prisma_migrations\" WHERE migration_name = '20260201135908_update_user_token';"

# 4. Remove the changes from the last migration manually
psql $DATABASE_URL << 'EOF'
ALTER TABLE "User" DROP COLUMN IF EXISTS role_id;
DROP TABLE IF EXISTS "roles" CASCADE;
EOF

# 5. Ensure the problematic index exists
psql $DATABASE_URL -c "CREATE UNIQUE INDEX IF NOT EXISTS \"User_resetToken_key\" ON \"User\"(\"resetToken\");"

# 6. Insert realistic test data
psql $DATABASE_URL << 'EOF'
-- Insert users with NULL resetTokens
INSERT INTO "User" (name, email, "passwordHash", "resetToken", "updatedAt")
VALUES 
  ('Alice', 'alice@example.com', '$2a$10$hash1', NULL, NOW()),
  ('Bob', 'bob@example.com', '$2a$10$hash2', NULL, NOW()),
  ('Charlie', 'charlie@example.com', '$2a$10$hash3', NULL, NOW()),
  ('David', 'david@example.com', '$2a$10$hash4', NULL, NOW());

-- Insert some notes
INSERT INTO "Note" (title, content, "userId")
VALUES 
  ('Note 1', 'Content 1', 1),
  ('Note 2', 'Content 2', 1),
  ('Note 3', 'Content 3', 2);
EOF

# 7. Run the migration
npm run db:migrate

# 8. Verify success
npm run verify-db

# 9. Check data integrity
psql $DATABASE_URL << 'EOF'
-- All users should still exist
SELECT COUNT(*) as user_count FROM "User";

-- All notes should still exist  
SELECT COUNT(*) as note_count FROM "Note";

-- Note-User relationships should be intact
SELECT n.title, u.name 
FROM "Note" n 
JOIN "User" u ON n."userId" = u.id;
EOF

# 10. Expected result: All data intact, migration successful

# 11. Clean up
dropdb istudy_test_prod_like
```

## Automated Test Script

For convenience, you can create a script to run all tests:

```bash
#!/bin/bash
# test-migrations.sh

set -e

echo "🧪 Running Migration Tests..."

# Test 1: Fresh database
echo "📝 Test 1: Fresh Database"
createdb istudy_test_1 || true
DATABASE_URL="postgresql://localhost:5432/istudy_test_1" npm run db:migrate
DATABASE_URL="postgresql://localhost:5432/istudy_test_1" npm run verify-db
dropdb istudy_test_1

echo "✅ Test 1 passed"

# Add more tests as needed...

echo "🎉 All tests passed!"
```

## What to Look For

When testing, verify:

1. ✅ No SQL errors during migration
2. ✅ All tables created successfully
3. ✅ All indexes created/dropped as expected
4. ✅ Foreign key constraints in place
5. ✅ Existing data preserved
6. ✅ Migration marked as complete in _prisma_migrations table
7. ✅ `npm run verify-db` reports success

## Troubleshooting Test Failures

If tests fail:

1. Check PostgreSQL logs: `tail -f /var/log/postgresql/postgresql-*.log`
2. Check Prisma migration logs
3. Verify PostgreSQL version compatibility (9.6+)
4. Ensure sufficient permissions on the database
5. Check that no other connections are holding locks

## Next Steps After Testing

Once all tests pass:

1. Commit the changes
2. Deploy to staging environment first
3. Test on staging with production-like data
4. Backup production database
5. Deploy to production
6. Run verification script
7. Monitor for errors
