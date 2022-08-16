const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const mobilBekas = async (req, res) => {
    const { userId, merk, model, tahun, jarak_tempuh, tipe_bahan_bakar, kapasitas_mesin, judul_iklan, deskripsi, alamat, provinsiId, harga, foto, kategori } = req.body

    const convertHarga = Number(harga)
    const convertTahun = Number(tahun)
    const convertJarakTempuh = Number(jarak_tempuh)
    const convertKapasitasMesin = Number(jarak_tempuh)
    await prisma.iklan.create({
        data: {
            userId,
            merk,
            model,
            tahun: convertTahun,
            jarak_tempuh: convertJarakTempuh,
            tipe_bahan_bakar,
            kapasitas_mesin: convertKapasitasMesin,
            judul_iklan,
            deskripsi,
            alamat,
            provinsiId,
            kategori: 'fsefse',
            harga: convertHarga,
            foto: { foto }
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