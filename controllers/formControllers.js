const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const mobilBekas = async (req, res) => {
    const { userId, l_bangunan, l_tanah, j_kamar_tidur, j_kamar_mandi, j_lantai, fasilitas_utama, sertifikasi, alamat_lokasi, merk, model, tahun, jarak_tempuh, tipe_bahan_bakar, kapasitas_mesin, judul_iklan, deskripsi, alamat, provinsiId, harga, foto, kategoriId } = req.body

    const convertHarga = Number(harga)
    const convertTahun = Number(tahun)
    const convertJarakTempuh = Number(jarak_tempuh)
    const convertKapasitasMesin = Number(kapasitas_mesin)
    const convertLTanah = Number(l_tanah)
    const convertLBangunan = Number(l_bangunan)
    const convertLantai = Number(j_lantai)
    const convertKamarTidur = Number(j_kamar_tidur)
    await prisma.iklan.create({
        data: {
            userId,
            merk: merk ? merk : 'null',
            model: model ? model : 'null',
            tahun: convertTahun ? convertTahun : 0000,
            jarak_tempuh: convertJarakTempuh ? convertJarakTempuh : null,
            tipe_bahan_bakar: tipe_bahan_bakar ? tipe_bahan_bakar : null,
            kapasitas_mesin: convertKapasitasMesin ? convertKapasitasMesin : 0,
            l_bangunan: convertLBangunan,
            l_tanah: convertLTanah,
            kamar_tidur: convertKamarTidur,
            lantai: convertLantai,
            fasilitas: fasilitas_utama.toString(),
            sertifikasi: sertifikasi,
            judul_iklan,
            deskripsi,
            alamat,
            provinsiId,
            kategori: kategoriId,
            kategoriId: kategoriId,
            harga: convertHarga,
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