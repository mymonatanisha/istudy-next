# Database Maintenance Scripts

This directory contains utility scripts for database maintenance and debugging.

## Course Migration Scripts

### migrate-static-courses.ts

Migrates existing static course data from `src/data/courses/courses-data.ts` into the database.

**Usage:**
```bash
npm run migrate:courses
```

**Features:**
- Automatic slug generation from titles
- Duplicate detection using legacyId
- Safe to run multiple times (idempotent)
- Detailed progress logging

**See:** `docs/COURSE_MIGRATION.md` for complete documentation

### verify-course-import.ts

Verifies the course import and checks for data issues.

**Usage:**
```bash
npm run verify:courses
```

**Checks:**
- Course counts and statistics
- Sample course listings
- Duplicate slugs/legacyIds
- Missing required fields

### seed-sample-courses.ts

Seeds the database with sample course data for development/testing.

**Usage:**
```bash
npm run seed:sample
```

## Database Verification

### verify-db-state.js

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
