/*
  Warnings:

  - Added the required column `bidEndDate` to the `Post` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "bidEndDate" TEXT NOT NULL,
ADD COLUMN     "price" TEXT NOT NULL;
