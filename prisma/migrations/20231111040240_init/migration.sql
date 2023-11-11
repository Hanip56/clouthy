-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_id_fkey";

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_upperId_fkey" FOREIGN KEY ("upperId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
