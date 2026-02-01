-- DropIndex (using IF EXISTS for idempotency)
DROP INDEX IF EXISTS "User_resetToken_key";

-- AlterTable (add column only if it doesn't exist)
DO $$ 
BEGIN 
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'User' AND column_name = 'role_id'
    ) THEN
        ALTER TABLE "User" ADD COLUMN "role_id" INTEGER;
    END IF;
END $$;

-- CreateTable (only if it doesn't exist)
CREATE TABLE IF NOT EXISTS "roles" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateIndex (only if it doesn't exist)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_class c
        JOIN pg_namespace n ON n.oid = c.relnamespace
        WHERE c.relname = 'roles_name_key'
    ) THEN
        CREATE UNIQUE INDEX "roles_name_key" ON "roles"("name");
    END IF;
END $$;

-- AddForeignKey (only if it doesn't exist)
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
