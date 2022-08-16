const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient()

async function main() {
    await prisma.provinsi.createMany({
        data: [
            {
                "name": "ACEH"
            },
            {
                "name": "SUMATERA UTARA"
            },
            {
                "name": "SUMATERA BARAT"
            },
            {
                "name": "RIAU"
            },
            {
                "name": "JAMBI"
            },
            {
                "name": "SUMATERA SELATAN"
            },
            {
                "name": "BENGKULU"
            },
            {
                "name": "LAMPUNG"
            },
            {
                "name": "KEPULAUAN BANGKA"
            },
            {
                "name": "KEPULAUAN RIAU"
            },
            {
                "name": "DKI JAKARTA"
            },
            {
                "name": "JAWA BARAT"
            },
            {
                "name": "JAWA TENGAH"
            },
            {
                "name": "DAERAH ISTIMEWA YOGYAKARTA"
            },
            {
                "name": "JAWA TIMUR"
            },
            {
                "name": "BANTEN"
            },
            {
                "name": "BALI"
            },
            {
                "name": "NUSA TENGGARA BARAT"
            },
            {
                "name": "NUSA TENGGARA TIMUR"
            },
            {
                "name": "KALIMANTAN BARAT"
            },
            {
                "name": "KALIMANTAN TENGAH"
            },
            {
                "name": "KALIMANTAN SELATAN"
            },
            {
                "name": "KALIMANTAN TIMUR"
            },
            {
                "name": "KALIMANTAN UTARA"
            },
            {
                "name": "SULAWESI UTARA"
            },
            {
                "name": "SULAWESI TENGAH"
            },
            {
                "name": "SULAWESI SELATAN"
            },
            {
                "name": "SULAWESI TENGGARA"
            },
            {
                "name": "GORONTALO"
            },
            {
                "name": "SULAWESI BARAT"
            },
            {
                "name": "MALUKU"
            },
            {
                "name": "MALUKU UTARA"
            },
            {
                "name": "PAPUA"
            },
            {
                "name": "PAPUA BARAT"
            }
        ]
    })
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.log(e)
        await prisma.$disconnect()
        process.exit(1)
    })