/*
  Warnings:

  - Added the required column `alamat` to the `Iklan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deskripsi` to the `Iklan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `foto` to the `Iklan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `harga` to the `Iklan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `judul_iklan` to the `Iklan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `kategori` to the `Iklan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Iklan" ADD COLUMN     "alamat" TEXT NOT NULL,
ADD COLUMN     "alamat_lokasi" TEXT,
ADD COLUMN     "deskripsi" TEXT NOT NULL,
ADD COLUMN     "fasilitas" TEXT,
ADD COLUMN     "foto" JSONB NOT NULL,
ADD COLUMN     "harga" BIGINT NOT NULL,
ADD COLUMN     "jarak_tempuh" BIGINT,
ADD COLUMN     "judul_iklan" TEXT NOT NULL,
ADD COLUMN     "kamar_tidur" INTEGER,
ADD COLUMN     "kapasitas_mesin" BIGINT,
ADD COLUMN     "kategori" TEXT NOT NULL,
ADD COLUMN     "l_bangunan" BIGINT,
ADD COLUMN     "l_tanah" BIGINT,
ADD COLUMN     "lantai" INTEGER,
ADD COLUMN     "merk" TEXT,
ADD COLUMN     "model" TEXT,
ADD COLUMN     "sertifikasi" TEXT,
ADD COLUMN     "tahun" BIGINT,
ADD COLUMN     "tipe_bahan_bakar" TEXT;
