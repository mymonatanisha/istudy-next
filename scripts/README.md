# Database Maintenance Scripts

This directory contains utility scripts for database maintenance and debugging.

## verify-db-state.js

Verifies the current state of your database and checks for common migration issues.

### Usage

```bash
node scripts/verify-db-state.js
```

Or add to package.json and run:

```bash
npm run verify-db
```

### What it checks

1. Database connectivity
2. Table existence (User, Note, Role)
3. Column presence (role_id, userId)
4. Data integrity (orphaned records)
5. Migration history
6. Index status
7. Schema completeness

### When to use

- Before deploying to production
- After migration failures
- When debugging database issues
- To compare local vs production state
