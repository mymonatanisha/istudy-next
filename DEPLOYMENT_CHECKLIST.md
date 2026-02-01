# Deployment Checklist for Production Migration

Use this checklist when deploying the migration fix to your live server.

## Pre-Deployment (DO FIRST!)

- [ ] **BACKUP YOUR DATABASE** (This is mandatory!)
  ```bash
  pg_dump $DATABASE_URL > backup-$(date +%Y%m%d-%H%M%S).sql
  ```

- [ ] Verify you have database access
  ```bash
  psql $DATABASE_URL -c "SELECT version();"
  ```

- [ ] Check current migration status
  ```bash
  npx prisma migrate status
  ```

- [ ] Run the verification script to understand current state
  ```bash
  npm run verify-db
  ```

- [ ] Review the migration file at `prisma/migrations/20260201135908_update_user_token/migration.sql`

## Deployment Options

Choose one of the following deployment methods:

### Option 1: Automated Deployment (Recommended)

Use this if you have access to run npm commands on the server.

- [ ] Pull the latest code with the fixed migration
  ```bash
  git pull origin copilot/debug-live-server-migration
  ```

- [ ] Install dependencies
  ```bash
  npm install
  ```

- [ ] Generate Prisma client
  ```bash
  npm run db:generate
  ```

- [ ] Deploy migrations
  ```bash
  npm run db:migrate
  ```

- [ ] Verify deployment
  ```bash
  npm run verify-db
  ```

### Option 2: Manual SQL Execution (If automated fails)

Use this if the automated migration fails or you prefer manual control.

- [ ] Connect to your database
  ```bash
  psql $DATABASE_URL
  ```

- [ ] Copy and paste the contents of `prisma/migrations/EMERGENCY_FIX.sql`
  - This script is idempotent and safe to run multiple times
  - It will check for existing schema elements before creating them

- [ ] Verify the migration was marked as complete
  ```sql
  SELECT migration_name, finished_at 
  FROM "_prisma_migrations" 
  WHERE migration_name = '20260201135908_update_user_token';
  ```

- [ ] Exit psql and run verification
  ```bash
  npm run verify-db
  ```

## Post-Deployment Verification

- [ ] Check that all migrations are applied
  ```bash
  npx prisma migrate status
  ```

- [ ] Verify database schema
  ```bash
  npm run verify-db
  ```

- [ ] Check for the new `roles` table
  ```bash
  psql $DATABASE_URL -c "\dt roles"
  ```

- [ ] Verify `role_id` column exists in User table
  ```bash
  psql $DATABASE_URL -c "\d User"
  ```

- [ ] Confirm the problematic index was removed
  ```bash
  psql $DATABASE_URL -c "SELECT indexname FROM pg_indexes WHERE tablename = 'User' AND indexname = 'User_resetToken_key';"
  ```
  Expected: No rows returned

- [ ] Check application functionality
  - [ ] Users can log in
  - [ ] User data is accessible
  - [ ] Notes are properly linked to users
  - [ ] No errors in application logs

## Rollback Plan (If Something Goes Wrong)

- [ ] Stop the application
- [ ] Restore from backup
  ```bash
  psql $DATABASE_URL < backup-YYYYMMDD-HHMMSS.sql
  ```
- [ ] Restart the application with the previous version of code
- [ ] Review the error logs
- [ ] Consult MIGRATION_GUIDE.md for troubleshooting

## Common Issues and Solutions

### Issue: "relation already exists"
**Solution**: The migration is idempotent. This shouldn't happen, but if it does, use the EMERGENCY_FIX.sql script.

### Issue: "permission denied"
**Solution**: Grant proper permissions to your database user:
```sql
GRANT ALL PRIVILEGES ON DATABASE your_db TO your_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO your_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO your_user;
```

### Issue: "database does not exist"
**Solution**: Create the database first:
```bash
createdb your_database_name
```

### Issue: Migration hangs or times out
**Solution**: 
1. Check for long-running queries: `SELECT * FROM pg_stat_activity;`
2. Check for locks: `SELECT * FROM pg_locks;`
3. Ensure no other migration processes are running

## Communication Checklist

- [ ] Notify team that deployment is starting
- [ ] Schedule maintenance window (if needed for large databases)
- [ ] Monitor application logs during deployment
- [ ] Notify team of successful deployment
- [ ] Document any issues encountered

## Success Criteria

✅ All migrations applied successfully
✅ No errors in application logs
✅ All application features working
✅ Database schema matches expectations
✅ Verification script reports success
✅ User authentication works
✅ Notes are accessible

## Post-Deployment Monitoring

Monitor for the first 24 hours:
- [ ] Application error logs
- [ ] Database query performance
- [ ] User authentication success rate
- [ ] Any reports of data issues

## Documentation

After successful deployment:
- [ ] Update deployment documentation with any lessons learned
- [ ] Note the deployment date and time
- [ ] Archive the backup file securely
- [ ] Update team on completion

---

## Need Help?

Refer to these documents:
- **MIGRATION_GUIDE.md** - Detailed debugging and deployment guide
- **TESTING_MIGRATIONS.md** - How to test migrations before deployment
- **README.md** - General setup and database management

For additional support, check:
1. Application logs
2. PostgreSQL logs
3. Prisma documentation: https://www.prisma.io/docs/
