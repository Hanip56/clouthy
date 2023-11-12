/*
  Warnings:

  - A unique constraint covering the columns `[sku]` on the table `ProductEntry` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProductEntry_sku_key" ON "ProductEntry"("sku");
