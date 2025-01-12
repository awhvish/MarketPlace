/*
  Warnings:

  - You are about to drop the column `bidHistory` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "bidHistory" JSONB NOT NULL DEFAULT '{}';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "bidHistory";
