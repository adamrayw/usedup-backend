-- AlterTable
ALTER TABLE "Iklan" ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'draft';

-- CreateTable
CREATE TABLE "Provinsi" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Provinsi_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Provinsi_id_key" ON "Provinsi"("id");

-- AddForeignKey
ALTER TABLE "Iklan" ADD CONSTRAINT "Iklan_provinsiId_fkey" FOREIGN KEY ("provinsiId") REFERENCES "Provinsi"("id") ON DELETE SET NULL ON UPDATE CASCADE;
