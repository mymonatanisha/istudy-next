-- DropForeignKey
ALTER TABLE "course_drafts" DROP CONSTRAINT "course_drafts_updatedBy_fkey";

-- AddForeignKey
ALTER TABLE "course_drafts" ADD CONSTRAINT "course_drafts_updatedBy_fkey" FOREIGN KEY ("updatedBy") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
