/*
  Warnings:

  - Added the required column `nameAr` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "categorySlug" TEXT,
ADD COLUMN     "nameAr" TEXT NOT NULL;
