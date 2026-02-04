-- Migrate existing firstName and lastName data to name field if name is empty
UPDATE "User"
SET "name" = COALESCE(
  NULLIF(TRIM(CONCAT(COALESCE("firstName", ''), ' ', COALESCE("lastName", ''))), ''),
  "name"
)
WHERE ("name" IS NULL OR "name" = '') AND ("firstName" IS NOT NULL OR "lastName" IS NOT NULL);

-- AlterTable
ALTER TABLE "User" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN "avatarUrl" TEXT,
ADD COLUMN "headline" TEXT;
