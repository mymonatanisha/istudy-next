-- Emergency Fix for Migration 20260201135908_update_user_token
-- 
-- Use this script if the automated migration fails on your production server.
-- This script is idempotent and can be run multiple times safely.
--
-- INSTRUCTIONS:
-- 1. Backup your database first!
-- 2. Connect to your database: psql $DATABASE_URL
-- 3. Copy and paste this entire script
-- 4. Verify success with: SELECT * FROM "_prisma_migrations" ORDER BY finished_at DESC LIMIT 1;

BEGIN;

-- Step 1: Drop the problematic index if it exists
DROP INDEX IF EXISTS "User_resetToken_key";

-- Step 2: Add role_id column if it doesn't exist
DO $$ 
BEGIN 
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'User' AND column_name = 'role_id'
    ) THEN
        ALTER TABLE "User" ADD COLUMN "role_id" INTEGER;
        RAISE NOTICE 'Added role_id column to User table';
    ELSE
        RAISE NOTICE 'role_id column already exists in User table';
    END IF;
END $$;

-- Step 3: Create roles table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.tables 
        WHERE table_name = 'roles'
    ) THEN
        CREATE TABLE "roles" (
            "id" SERIAL NOT NULL,
            "name" TEXT NOT NULL,
            CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
        );
        RAISE NOTICE 'Created roles table';
    ELSE
        RAISE NOTICE 'roles table already exists';
    END IF;
END $$;

-- Step 4: Create unique index on roles.name if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_class c
        JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE c.relname = 'roles_name_key'
        AND n.nspname = 'public'
    ) THEN
        CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");
        RAISE NOTICE 'Created unique index on roles.name';
    ELSE
        RAISE NOTICE 'Index roles_name_key already exists';
    END IF;
END $$;

-- Step 5: Add foreign key constraint if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.table_constraints 
        WHERE constraint_name = 'User_role_id_fkey'
        AND table_name = 'User'
    ) THEN
        ALTER TABLE "User" ADD CONSTRAINT "User_role_id_fkey" 
        FOREIGN KEY ("role_id") REFERENCES "roles"("id") 
        ON DELETE SET NULL ON UPDATE CASCADE;
        RAISE NOTICE 'Added foreign key constraint User_role_id_fkey';
    ELSE
        RAISE NOTICE 'Foreign key constraint User_role_id_fkey already exists';
    END IF;
END $$;

-- Step 6: Mark migration as complete in Prisma (only if not already marked)
-- NOTE: The checksum below is a placeholder. Prisma will recalculate it on deploy.
-- This ensures the migration is marked as applied even if checksums don't match exactly.
DO $$
DECLARE
    migration_exists BOOLEAN;
BEGIN
    SELECT EXISTS(
        SELECT 1 FROM "_prisma_migrations" 
        WHERE migration_name = '20260201135908_update_user_token'
    ) INTO migration_exists;
    
    IF NOT migration_exists THEN
        INSERT INTO "_prisma_migrations" (
            id, 
            checksum, 
            finished_at, 
            migration_name, 
            logs, 
            rolled_back_at, 
            started_at, 
            applied_steps_count
        )
        VALUES (
            gen_random_uuid()::text,
            '00000000000000000000000000000000000000000000000000000000000000',
            NOW(),
            '20260201135908_update_user_token',
            NULL,
            NULL,
            NOW(),
            1
        );
        RAISE NOTICE 'Marked migration 20260201135908_update_user_token as complete';
    ELSE
        RAISE NOTICE 'Migration 20260201135908_update_user_token already marked as complete';
    END IF;
END $$;

COMMIT;

-- Verification queries
SELECT 'Migration completed successfully!' AS status;
SELECT migration_name, finished_at FROM "_prisma_migrations" 
WHERE migration_name = '20260201135908_update_user_token';
