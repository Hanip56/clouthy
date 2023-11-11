/*
  Warnings:

  - The `sku` column on the `ProductEntry` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "ProductEntry" DROP COLUMN "sku",
ADD COLUMN     "sku" SERIAL NOT NULL;
