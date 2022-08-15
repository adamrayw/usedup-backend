const { PrismaClient } = require('@prisma/client')
const cloudinary = require('cloudinary').v2
const prisma = new PrismaClient()


cloudinary.config().cloud_name;


const mobilBekas = async (req, res) => {
    const { userId, merk, model, tahun, jarak_tempuh, tipe_bahan_bakar, kapasitas_mesin, judul_iklan, deskripsi, alamat, provinsi, harga, foto, kategori } = req.body
    console.log(userId, merk, model, tahun, jarak_tempuh, tipe_bahan_bakar, kapasitas_mesin, judul_iklan, deskripsi, alamat, provinsi, harga, foto, kategori);

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
            provinsiId: provinsi,
            kategori: 'fsefse',
            harga: convertHarga,
            foto: { foto }
        }
    })

    res.json({
        message: 'success'
    })

}

module.exports = { mobilBekas }