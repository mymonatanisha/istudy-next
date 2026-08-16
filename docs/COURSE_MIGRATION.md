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

