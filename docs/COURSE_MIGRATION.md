# Course Migration Documentation

## 📖 Overview

This document describes the process of migrating existing static course data from `courses-data.ts` into the database `courses` table. This migration enables the transition from hardcoded course data to dynamic database-driven courses.

## 🎯 Purpose

The migration script serves to:
- Import legacy course data from static TypeScript files into the database
- Enable dynamic course management through the database
- Maintain backward compatibility with legacy course IDs
- Provide a foundation for future course content management

## 📋 Files

### Migration Script
- **Path**: `scripts/migrate-static-courses.ts`
- **Purpose**: Imports courses from `src/data/courses/courses-data.ts` into the database
- **Features**:
  - ✅ Idempotent (can be run multiple times safely)
  - ✅ Duplicate prevention via `legacyId` checking
  - ✅ Automatic slug generation from titles
  - ✅ Image path conversion (StaticImageData → string URLs)
  - ✅ Progress logging and error handling
  - ✅ Summary statistics

### Verification Script
- **Path**: `scripts/verify-course-import.ts`
- **Purpose**: Validates the imported course data
- **Checks**:
  - ✅ Total course count
  - ✅ Legacy course count
  - ✅ Lists first 5 imported courses
  - ✅ Validates slug presence
  - ✅ Checks for duplicate slugs
  - ✅ Validates required fields

## 🚀 Usage

### Prerequisites

Ensure you have:
1. Node.js installed (version 20.x)
2. Database connection configured (DATABASE_URL in `.env`)
3. Prisma migrations applied (`npm run db:migrate`)
4. Dependencies installed (`npm install`)

### Local Development

#### 1. Run Migration

```bash
npm run migrate:courses
```

This will:
- Read all courses from `courses-data.ts`
- Check for existing courses by `legacyId`
- Import new courses with `isLegacy = true`
- Display progress and summary

**Expected Output:**
```
🚀 Starting course migration from static data to database...

✅ Success: "Master Data Science from Scratch" (ID: 1, Legacy ID: 1)
⏭️  Skipped: "Complete Guide to Web Development" (Legacy ID: 2) - Already imported
...

============================================================
📊 Migration Summary:
============================================================
Total courses processed: 12
✅ Successfully imported: 10
⏭️  Skipped (already exist): 2
❌ Failed: 0
============================================================

🎉 Migration completed successfully!
```

#### 2. Verify Import

```bash
npm run verify:courses
```

This will:
- Count total courses in database
- Count legacy courses
- List first 5 imported courses
- Check for data quality issues
- Validate slugs and required fields

**Expected Output:**
```
🔍 Verifying course import...

============================================================
📊 Total courses in database: 12
🏷️  Legacy courses: 12
📢 Published courses: 12
============================================================

📋 First 5 imported courses:
------------------------------------------------------------

1. Master Data Science from Scratch
   ID: 1 | Slug: master-data-science-from-scratch
   Legacy ID: 1 | Is Legacy: true
   Status: published | Instructor: Unknown Instructor
   Price: $250
...

🔍 Checking for data quality issues...
------------------------------------------------------------
✅ All courses have valid slugs
✅ No duplicate slugs found
✅ All courses have required fields

============================================================
🎉 Verification completed!
============================================================
```

### Production Deployment

#### 1. Run Migration in Production

```bash
# Using npm
npm run migrate:courses

# Or directly with ts-node
npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/migrate-static-courses.ts
```

#### 2. Verify in Production

```bash
# Using npm
npm run verify:courses

# Or directly with ts-node
npx ts-node --compiler-options '{"module":"CommonJS"}' scripts/verify-course-import.ts
```

## 📊 Data Mapping

The migration script maps static course fields to database fields as follows:

| Static Field | Database Field | Notes |
|-------------|---------------|-------|
| `course.id` | `legacyId` | Stored for reference |
| `course.title` | `title` | Used as-is |
| `course.title` (slugified) | `slug` | Generated from title |
| `course.courseTag` | `courseTag` | Optional field |
| `course.badge` | `badge` | Optional field |
| `course.badgeClass` | `badgeClass` | Optional field |
| `course.instructorName` | `instructorName` | Defaults to "Unknown Instructor" |
| `course.instructorImage?.src` | `instructorAvatar` | Extracted from StaticImageData |
| `course.lessons` | `lessons` | Defaults to 0 |
| N/A | `students` | Set to 0 initially |
| `course.rating` | `rating` | Defaults to 0 |
| `course.price` | `price` | Defaults to 0 |
| `course.discount` | `oldPrice` | Original price before discount |
| `course.courseDescription` | `courseDescription` | Required field |
| `course.details` | `shortDescription` | Optional field |
| `course.image?.src` | `thumbnail` | Extracted from StaticImageData |
| `course.image?.src` | `coverImage` | Same as thumbnail |
| N/A | `instructorId` | Set to null (can link later) |
| N/A | `status` | Set to 'published' |
| N/A | `publishedAt` | Set to current date/time |
| N/A | `isLegacy` | Set to true |

## 🔧 Slug Generation

Slugs are generated automatically from course titles:

1. Convert to lowercase
2. Remove special characters
3. Replace spaces with hyphens
4. Remove multiple consecutive hyphens
5. Trim leading/trailing hyphens
6. Fallback to `course-{id}` if title is empty

**Examples:**
- "Master Data Science from Scratch" → `master-data-science-from-scratch`
- "Complete Guide to Web Development!" → `complete-guide-to-web-development`
- "AI & Machine Learning" → `ai-machine-learning`

## 🛡️ Safety Features

### Idempotency
The migration script can be run multiple times safely:
- Checks for existing courses by `legacyId` before inserting
- Skips courses that are already imported
- Logs all skipped courses

### Error Handling
- Individual course failures don't stop the entire migration
- Each course is wrapped in try-catch block
- Errors are logged with course ID and title
- Final summary shows success/failure counts

### Data Validation
- Required fields are validated
- Image paths are safely extracted
- Default values are provided for optional fields
- Database constraints prevent invalid data

## 🐛 Troubleshooting

### Issue: "Database connection failed"

**Solution:**
```bash
# Check your DATABASE_URL in .env file
# Ensure database is running and accessible
npm run db:status
```

### Issue: "Duplicate slug error"

**Cause:** Two courses with the same title
**Solution:** The script should handle this, but if manual intervention is needed:

```sql
-- Check duplicate slugs
SELECT slug, COUNT(*) FROM courses GROUP BY slug HAVING COUNT(*) > 1;

-- Update one of the duplicate slugs
UPDATE courses SET slug = 'new-unique-slug' WHERE id = <course_id>;
```

### Issue: "Course already exists"

**Behavior:** This is expected! The script skips existing courses.
**Action:** No action needed. The script will log skipped courses.

### Issue: "Missing instructor name"

**Behavior:** The script sets a default value: "Unknown Instructor"
**Action:** Update instructor names later:

```sql
UPDATE courses SET instructorName = 'Actual Name' WHERE instructorName = 'Unknown Instructor';
```

### Issue: "StaticImageData not converting properly"

**Solution:** 
- Check that the image imports in `courses-data.ts` are valid
- Verify image files exist in `/public/assets/images/`
- The script extracts the `.src` property from StaticImageData objects

## 📝 Notes

### Static Data Preservation
- The original `courses-data.ts` file remains unchanged
- Static data can still be used alongside database data
- Migration is one-way (static → database only)

### Future Enhancements
Possible improvements for future iterations:
- Link courses to actual instructor user accounts
- Bulk update operations for instructor assignments
- Image upload to CDN during migration
- Course content migration (lessons, modules, etc.)
- Category and tag management

### Re-running Migration
The script is safe to re-run:
- Already imported courses are skipped
- Only new courses are added
- No data is deleted or overwritten

## 🔗 Related Commands

```bash
# Database management
npm run db:generate      # Generate Prisma client
npm run db:migrate       # Run migrations
npm run db:migrate:dev   # Run migrations in dev mode
npm run db:status        # Check migration status
npm run db:studio        # Open Prisma Studio

# Course operations
npm run migrate:courses  # Import static courses
npm run verify:courses   # Verify imported courses
npm run seed:sample      # Seed sample courses (testing)

# Development
npm run dev              # Start development server
npm run build            # Build for production
npm run lint             # Run linter
```

## 📚 Additional Resources

- [Prisma Documentation](https://www.prisma.io/docs/)
- [Database Schema](../prisma/schema.prisma)
- [Static Course Data](../src/data/courses/courses-data.ts)
- [Verification Script](../scripts/verify-course-import.ts)

---

**Last Updated:** February 2026  
**Version:** 1.0.0
