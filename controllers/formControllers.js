const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const mobilBekas = async (req, res) => {
    const { userId, l_bangunan, l_tanah, j_kamar_tidur, j_kamar_mandi, j_lantai, fasilitas_utama, sertifikasi, alamat_lokasi, merk, model, tahun, jarak_tempuh, tipe_bahan_bakar, kapasitas_mesin, penyimpanan, ram, judul_iklan, deskripsi, alamat, provinsiId, harga, foto, kategoriId } = req.body

    function convertToNumber(value) {
        return Number(value)
    }

    await prisma.iklan.create({
        data: {
            userId,
            merk: merk ? merk : 'null',
            model: model ? model : 'null',
            tahun: convertToNumber(tahun) ? convertToNumber(tahun) : 0000,
            jarak_tempuh: convertToNumber(jarak_tempuh) ? convertToNumber(jarak_tempuh) : null,
            tipe_bahan_bakar: tipe_bahan_bakar ? tipe_bahan_bakar : null,
            kapasitas_mesin: convertToNumber(kapasitas_mesin) ? convertToNumber(kapasitas_mesin) : 0,
            penyimpanan: convertToNumber(penyimpanan) ? convertToNumber(penyimpanan) : null,
            ram: convertToNumber(ram) ? convertToNumber(ram) : null,
            l_bangunan: convertToNumber(l_bangunan) ? convertToNumber(l_bangunan) : null,
            l_tanah: convertToNumber(l_tanah) ? convertToNumber(l_tanah) : null,
            kamar_tidur: convertToNumber(j_kamar_tidur) ? convertToNumber(j_kamar_tidur) : null,
            lantai: convertToNumber(j_lantai) ? convertToNumber(j_lantai) : null,
            fasilitas: fasilitas_utama === undefined ? null : fasilitas_utama.toString(),
            sertifikasi: sertifikasi,
            judul_iklan,
            deskripsi,
            alamat,
            provinsiId,
            kategori: kategoriId,
            kategoriId: kategoriId,
            harga: convertToNumber(harga),
            foto
        }
    })
    res.json({
        message: 'success'
    })

}

const provinsiData = async (req, res) => {
    try {
        const response = await prisma.provinsi.findMany()

        res.json(response)

    } catch (e) {
        res.json(e)
    }
}

module.exports = { mobilBekas, provinsiData }