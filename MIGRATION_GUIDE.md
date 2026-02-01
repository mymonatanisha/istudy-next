# Migration Debugging and Deployment Guide

## Overview
This guide helps you debug and resolve database migration issues when deploying to production/live servers.

## Common Migration Issues

### Issue 1: Index/Constraint Already Exists or Doesn't Exist
**Symptoms**: 
- Migration fails with "relation already exists" or "does not exist"
- Works locally but fails on production

**Cause**: Production database may have a different state than your local database.

**Solution**: Use idempotent migrations (see fixes below).

### Issue 2: Unique Constraint on Nullable Fields
**Symptoms**:
- Migration fails when dropping unique index on nullable fields
- Error: "could not create unique index"

**Cause**: Multiple NULL values exist in production data for a unique field.

**Solution**: Remove the unique constraint properly before migration.

## Quick Debugging Steps

### 1. Check Current Database State
```bash
# Connect to your production database
psql $DATABASE_URL

# Check if the User table exists
\dt User

# Check current indexes on User table
\d User

# Check if roles table exists
\dt roles

# List all indexes
SELECT tablename, indexname FROM pg_indexes WHERE schemaname = 'public';
```

### 2. Check Migration Status
```bash
# Check which migrations have been applied
npx prisma migrate status

# View migration history in database
psql $DATABASE_URL -c "SELECT * FROM _prisma_migrations ORDER BY finished_at;"
```

### 3. Verify Database Connection
```bash
# Test connection
npx prisma db execute --stdin <<< "SELECT 1 as test;"

# Check database version
psql $DATABASE_URL -c "SELECT version();"
```

## Deployment Steps

### Step 1: Backup Your Database
**ALWAYS backup before running migrations on production!**

```bash
# For PostgreSQL
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d-%H%M%S).sql

# For cloud providers, use their backup tools
```

### Step 2: Deploy with Idempotent Migrations

The migrations in this project have been updated to be idempotent, meaning they can be run multiple times safely.

```bash
# Deploy migrations
npx prisma migrate deploy

# Or use Prisma's shadow database (recommended for production)
npx prisma migrate deploy --shadow-database-url=$SHADOW_DATABASE_URL
```

### Step 3: Verify Deployment
```bash
# Check migration status
npx prisma migrate status

# Verify schema matches
npx prisma db pull
git diff prisma/schema.prisma  # Should show no changes
```

## Manual Migration Fix (If Automated Fix Fails)

If the automated migration still fails, you can manually fix the database state:

### For the `update_user_token` Migration

```sql
-- 1. First, check if the index exists
SELECT indexname FROM pg_indexes WHERE indexname = 'User_resetToken_key';

-- 2. If it exists, drop it
DROP INDEX IF EXISTS "User_resetToken_key";

-- 3. Check if role_id column exists
SELECT column_name FROM information_schema.columns 
WHERE table_name = 'User' AND column_name = 'role_id';

-- 4. If it doesn't exist, add it
ALTER TABLE "User" ADD COLUMN IF NOT EXISTS "role_id" INTEGER;

-- 5. Check if roles table exists
SELECT tablename FROM pg_tables WHERE tablename = 'roles';

-- 6. If it doesn't exist, create it
CREATE TABLE IF NOT EXISTS "roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- 7. Add unique index if needed
CREATE UNIQUE INDEX IF NOT EXISTS "roles_name_key" ON "roles"("name");

-- 8. Add foreign key constraint if needed
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'User_role_id_fkey'
    ) THEN
        ALTER TABLE "User" ADD CONSTRAINT "User_role_id_fkey" 
        FOREIGN KEY ("role_id") REFERENCES "roles"("id") 
        ON DELETE SET NULL ON UPDATE CASCADE;
    END IF;
END $$;

-- 9. Mark migration as complete in Prisma
INSERT INTO "_prisma_migrations" (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count)
VALUES (
    gen_random_uuid()::text,
    'checksum_placeholder',
    NOW(),
    '20260201135908_update_user_token',
    NULL,
    NULL,
    NOW(),
    1
) ON CONFLICT DO NOTHING;
```

## Environment-Specific Configuration

### Development Environment
```bash
# .env.development
DATABASE_URL="postgresql://user:password@localhost:5432/istudy_dev"
```

### Production Environment
```bash
# .env.production
DATABASE_URL="postgresql://user:password@prod-host:5432/istudy_prod"
SHADOW_DATABASE_URL="postgresql://user:password@prod-host:5432/istudy_shadow"
```

## Troubleshooting

### Error: "relation already exists"
- The table/index already exists in the database
- Use `IF NOT EXISTS` or `IF EXISTS` in your migration
- Check if migration was partially applied

### Error: "permission denied"
- Database user lacks necessary permissions
- Grant appropriate permissions:
  ```sql
  GRANT ALL PRIVILEGES ON DATABASE istudy TO your_user;
  GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_user;
  ```

### Error: "database does not exist"
- Database hasn't been created yet
- Create it first: `createdb istudy_prod`

### Error: "migration has already been applied"
- Migration was already run
- Check migration status: `npx prisma migrate status`
- If you need to re-run, you can mark it as rolled back in the `_prisma_migrations` table

## Best Practices

1. **Always test migrations locally first**
   ```bash
   # Create a production-like database locally
   createdb istudy_staging
   DATABASE_URL="postgresql://localhost/istudy_staging" npx prisma migrate deploy
   ```

2. **Use migration preview before deploying**
   ```bash
   npx prisma migrate dev --create-only --name descriptive_name
   # Review the generated SQL before applying
   ```

3. **Keep migrations small and focused**
   - One logical change per migration
   - Easier to debug and rollback if needed

4. **Never edit applied migrations**
   - Once a migration is applied to production, create a new migration to fix issues
   - The migrations in this repo have been fixed for idempotency

5. **Use transactions where possible**
   - Prisma migrations run in transactions by default
   - Ensures all-or-nothing application

## Rollback Strategy

If a migration fails and you need to rollback:

```bash
# 1. Restore from backup
psql $DATABASE_URL < backup-YYYYMMDD-HHMMSS.sql

# 2. Or manually remove the migration record
psql $DATABASE_URL -c "DELETE FROM _prisma_migrations WHERE migration_name = 'problematic_migration';"

# 3. Fix the migration SQL file and try again
```

## Getting Help

If you continue to experience issues:

1. Check the migration logs: `npx prisma migrate status`
2. Review PostgreSQL logs on your server
3. Compare local vs production database schema:
   ```bash
   # Export production schema
   pg_dump -s $DATABASE_URL > prod_schema.sql
   
   # Export local schema
   pg_dump -s $LOCAL_DATABASE_URL > local_schema.sql
   
   # Compare
   diff prod_schema.sql local_schema.sql
   ```

4. Create an issue with:
   - Full error message
   - Migration status output
   - Database schema differences
   - PostgreSQL version (`SELECT version();`)
