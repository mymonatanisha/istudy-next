# Database Maintenance Scripts

This directory contains utility scripts for database maintenance, seeding, and migration.

## Available Scripts

### 1. verify-db-state.js

Verifies the current state of your database and checks for common migration issues.

#### Usage

```bash
node scripts/verify-db-state.js
# or
npm run verify-db
```

#### What it checks

1. Database connectivity
2. Table existence (User, Note, Role, Course, etc.)
3. Column presence (role_id, userId, legacyId, etc.)
4. Data integrity (orphaned records)
5. Migration history
6. Index status
7. Schema completeness

#### When to use

- Before deploying to production
- After migration failures
- When debugging database issues
- To compare local vs production state

---

### 2. seed-sample-courses.ts

Seeds the database with sample courses for testing and development.

#### Usage

```bash
npm run seed:sample
# or
npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/seed-sample-courses.ts
```

#### What it does

- Creates 3 sample courses with realistic data
- Sets courses as published and featured
- Includes instructor info, pricing, and descriptions
- Useful for testing course functionality

#### When to use

- Setting up a new development environment
- Testing course-related features
- Demonstrating the application

---

### 3. migrate-static-courses.ts ✨ NEW

Migrates existing static course data from `courses-data.ts` into the database.

#### Usage

```bash
npm run migrate:courses
# or
npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/migrate-static-courses.ts
```

#### What it does

- Reads courses from `src/data/courses/courses-data.ts`
- Checks for existing courses by `legacyId` (idempotent)
- Generates SEO-friendly slugs from titles
- Converts StaticImageData to URL strings
- Marks imported courses as legacy (`isLegacy = true`)
- Provides detailed progress and error logging
- Displays summary statistics

#### Key Features

- **Idempotent**: Safe to run multiple times
- **Duplicate Prevention**: Skips already imported courses
- **Error Handling**: Continues on individual failures
- **Data Validation**: Ensures required fields are present

#### When to use

- Initial migration from static to database-driven courses
- After adding new courses to `courses-data.ts`
- Re-importing after database reset

📖 **See [docs/COURSE_MIGRATION.md](../docs/COURSE_MIGRATION.md) for detailed documentation**

---

### 4. verify-course-import.ts ✨ NEW

Verifies the integrity and quality of imported course data.

#### Usage

```bash
npm run verify:courses
# or
npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/verify-course-import.ts
```

#### What it checks

- Total course count
- Legacy course count
- Published course count
- Lists first 5 imported courses
- Validates slug presence
- Checks for duplicate slugs
- Validates required fields (title, description, instructor)

#### When to use

- After running `migrate:courses`
- To audit data quality
- Before deploying to production
- When debugging course issues

---

## Package.json Scripts

All scripts can be run using npm commands defined in `package.json`:

```json
{
  "scripts": {
    "verify-db": "node scripts/verify-db-state.js",
    "seed:sample": "ts-node --compiler-options {\"module\":\"CommonJS\"} scripts/seed-sample-courses.ts",
    "migrate:courses": "ts-node --compiler-options {\"module\":\"CommonJS\"} scripts/migrate-static-courses.ts",
    "verify:courses": "ts-node --compiler-options {\"module\":\"CommonJS\"} scripts/verify-course-import.ts"
  }
}
```

## Prerequisites

- Node.js 20.x
- PostgreSQL database
- `DATABASE_URL` configured in `.env`
- Prisma migrations applied (`npm run db:migrate`)
- Dependencies installed (`npm install`)

## Recommended Workflow

### Initial Setup

1. Setup database and apply migrations:
   ```bash
   npm run db:migrate
   npm run db:generate
   ```

2. Verify database state:
   ```bash
   npm run verify-db
   ```

3. Import static courses:
   ```bash
   npm run migrate:courses
   ```

4. Verify course import:
   ```bash
   npm run verify:courses
   ```

### Adding Test Data

```bash
npm run seed:sample
```

### Before Production Deployment

```bash
npm run verify-db
npm run migrate:courses
npm run verify:courses
```

## Troubleshooting

### Database Connection Errors

- Check `DATABASE_URL` in `.env`
- Ensure PostgreSQL is running
- Verify network connectivity

### Migration Failures

- Run `npm run db:status` to check migration state
- Check for pending migrations with `npm run db:migrate`
- Review error logs for specific issues

### Course Import Issues

- Verify source data in `src/data/courses/courses-data.ts`
- Check that images exist in `/public/assets/images/`
- Review detailed logs from `migrate:courses` output

## Related Documentation

- [Course Migration Guide](../docs/COURSE_MIGRATION.md) - Detailed migration documentation
- [Database Schema](../prisma/schema.prisma) - Prisma schema definition
- [Static Course Data](../src/data/courses/courses-data.ts) - Source data file

---

**Last Updated:** February 2026
