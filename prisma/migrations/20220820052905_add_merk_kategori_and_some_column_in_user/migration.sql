-- AlterTable
ALTER TABLE "Iklan" ADD COLUMN     "kategoriId" TEXT,
ADD COLUMN     "merkId" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "foto_profile" JSONB,
ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Merk" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Merk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Kategori" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Kategori_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Merk_id_key" ON "Merk"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Kategori_id_key" ON "Kategori"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Kategori_slug_key" ON "Kategori"("slug");

-- AddForeignKey
ALTER TABLE "Iklan" ADD CONSTRAINT "Iklan_merkId_fkey" FOREIGN KEY ("merkId") REFERENCES "Merk"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Iklan" ADD CONSTRAINT "Iklan_kategoriId_fkey" FOREIGN KEY ("kategoriId") REFERENCES "Kategori"("id") ON DELETE SET NULL ON UPDATE CASCADE;
