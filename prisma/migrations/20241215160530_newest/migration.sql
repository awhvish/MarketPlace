/*
  Warnings:

  - A unique constraint covering the columns `[id,username]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_authorId_fkey";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "authorUserName" TEXT NOT NULL DEFAULT 'John';

-- CreateIndex
CREATE UNIQUE INDEX "User_id_username_key" ON "User"("id", "username");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_authorId_authorUserName_fkey" FOREIGN KEY ("authorId", "authorUserName") REFERENCES "User"("id", "username") ON DELETE RESTRICT ON UPDATE CASCADE;
