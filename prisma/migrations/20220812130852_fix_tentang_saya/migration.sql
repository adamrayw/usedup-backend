/*
  Warnings:

  - You are about to drop the column `tentang_sata` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "tentang_sata",
ADD COLUMN     "tentang_saya" TEXT;
