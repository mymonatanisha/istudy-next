-- AlterTable
ALTER TABLE "User" DROP COLUMN "firstName",
DROP COLUMN "lastName",
ADD COLUMN "avatarUrl" TEXT,
ADD COLUMN "headline" TEXT;
