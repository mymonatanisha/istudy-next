# Course Migration Guide

This guide explains how to migrate existing static course data from `courses-data.ts` into the database.

## Overview

The migration scripts import courses from the static TypeScript file into the PostgreSQL database, making them available for dynamic management through the application.

## Prerequisites

- PostgreSQL database set up and running
- Environment variables configured (`.env` file with `DATABASE_URL`)
- Node.js and npm installed
- Prisma schema up to date (`npm run db:generate`)

## Migration Scripts

### 1. Main Migration Script

**File:** `scripts/migrate-static-courses.ts`

This script reads courses from `src/data/courses/courses-data.ts` and imports them into the database.

**Features:**
- ✅ Automatic slug generation from course titles
- ✅ Duplicate detection using `legacyId`
- ✅ Safe to run multiple times (idempotent)
- ✅ No data deletion
- ✅ Detailed progress logging
- ✅ Error handling with statistics

**Data Mapping:**
- `course.id` → `legacyId` (for tracking original IDs)
- `course.title` → `title` + auto-generated `slug`
- `course.instructorName` → `instructorName`
- `course.instructorImage` → `instructorAvatar`
- `course.price` → `price`
- `course.discount` → `oldPrice`
- `course.lessons` → `lessons`
- `course.rating` → `rating`
- `course.image` → `thumbnail`
- `course.courseDescription` → `courseDescription`
- All imported courses have:
  - `status` = `'published'`
  - `isLegacy` = `true`
  - `publishedAt` = current date

### 2. Verification Script

**File:** `scripts/verify-course-import.ts`

This script validates the imported data and checks for issues.

**Checks:**
- Course counts (total, legacy, published, draft)
- Sample course listings
- Missing required fields (titles, instructors)
- Duplicate slugs
- Duplicate legacyIds
- Zero-price courses
- Missing thumbnails

## Running the Migration

### Step 1: Backup Your Database

Always backup your database before running migrations:

```bash
pg_dump -U your_user -d istudy_dev > backup_$(date +%Y%m%d_%H%M%S).sql
```

### Step 2: Run the Migration

Use the npm script to migrate courses:

```bash
npm run migrate:courses
```

**Expected Output:**
```
🚀 Starting course migration from static data...

📚 Found 12 courses in static data

✅ Created course ID 1: "Master Data Science from Scratch" (DB ID: 1, slug: master-data-science-from-scratch)
✅ Created course ID 12: "Complete Digital Marketing Guide" (DB ID: 2, slug: complete-digital-marketing-guide)
...

============================================================
📊 Migration Summary:
============================================================
   Total courses in static data: 12
   ✅ Successfully created:      12
   ⏭️  Skipped (already exist):   0
   ❌ Errors:                    0
============================================================

📈 Database Statistics:
   Total courses in database:     12
   Legacy courses:                12
   Published courses:             12

🎉 Migration completed successfully!
```

### Step 3: Verify the Import

After migration, run the verification script:

```bash
npm run verify:courses
```

**Expected Output:**
```
🔍 Verifying course import...

📊 Course Import Statistics:
============================================================
   Total courses:           12
   Legacy courses:          12
   Published courses:       12
   Draft courses:           0
   Featured courses:        0
============================================================

📚 Sample Courses (first 5):
------------------------------------------------------------

1. Master Data Science from Scratch
   ID: 1 | Legacy ID: 1 | Slug: master-data-science-from-scratch
   Instructor: Unknown Instructor | Price: $250
   Lessons: 45 | Rating: 4.8 | Status: published
   Is Legacy: Yes
...

🔍 Checking for Data Issues:
------------------------------------------------------------

============================================================
✅ Verification passed! No critical data issues found.
============================================================
```

## Re-running the Migration

The migration is **idempotent** - it's safe to run multiple times:

- Already-migrated courses are skipped based on their `legacyId`
- No existing data is deleted or modified
- Only new courses are added

## Troubleshooting

### Issue: "Database connection failed"

**Solution:** Check your `.env` file and ensure `DATABASE_URL` is correct:

```bash
# Check if database is accessible
npm run db:status
```

### Issue: "Slug already exists" warnings

**Solution:** The script automatically appends the legacyId to duplicate slugs. This is normal if you have manually created courses with similar names.

### Issue: "Course already exists with legacyId"

**Solution:** This is expected behavior. The course was already migrated. The script skips it automatically.

### Issue: TypeScript compilation errors

**Solution:** Ensure TypeScript and ts-node are installed:

```bash
npm install --save-dev typescript ts-node
```

### Issue: Prisma client errors

**Solution:** Regenerate the Prisma client:

```bash
npm run db:generate
```

## Viewing Migrated Courses

### Using Prisma Studio

```bash
npm run db:studio
```

This opens a GUI where you can browse the `courses` table.

### Using the Application

Navigate to the courses page in your application. All migrated courses should appear with their legacy data.

## Rollback

If you need to remove migrated courses:

```sql
-- Remove all legacy courses
DELETE FROM courses WHERE "isLegacy" = true;

-- Or remove specific courses by legacyId
DELETE FROM courses WHERE "legacyId" IN (1, 12, 27, 28);
```

**⚠️ Warning:** Always backup before deleting data!

## Next Steps

After successful migration:

1. ✅ Verify all courses appear correctly in the application
2. ✅ Test course detail pages
3. ✅ Check enrollment functionality
4. ✅ Review instructor names and update as needed
5. ✅ Add cover images if missing
6. ✅ Set featured flags for popular courses
7. ✅ Update course descriptions if needed

## Support

If you encounter issues not covered here:

1. Check the migration script output for specific error messages
2. Review the verification script output for data issues
3. Check the Prisma schema matches your database
4. Ensure all dependencies are installed

## Technical Details

### Slug Generation Algorithm

```typescript
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
```

### Image Path Extraction

The scripts extract image paths from Next.js `StaticImageData` objects by accessing the `.src` property.

### Database Schema Fields

The migration uses these database fields:
- Required: `title`, `slug`, `instructorName`, `price`, `courseDescription`, `status`
- Optional: `thumbnail`, `oldPrice`, `courseTag`, `badge`, `badgeClass`, `instructorAvatar`
- Metadata: `legacyId`, `isLegacy`, `publishedAt`, `createdAt`, `updatedAt`
