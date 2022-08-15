/*
  Warnings:

  - You are about to drop the column `alamat_lokasi` on the `Iklan` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Iklan" DROP COLUMN "alamat_lokasi",
ADD COLUMN     "provinsiId" TEXT;
