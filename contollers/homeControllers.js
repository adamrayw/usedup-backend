const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()

function updateData(data) {
    const updatedData = JSON.stringify(data, (key, value) => (
        typeof value === 'bigint' ? value.toString() : value
    ))

    const parsed = JSON.parse(updatedData)

    return parsed
}

const home = async (req, res) => {
    try {
        // const data = await prisma.iklan.findMany()
        const data = await prisma.iklan.findMany({
            include: {
                Provinsi: true
            }
        })

        const updated = updateData(data)

        res.status(200).json(updated)
    } catch (e) {
        res.status(500).json({
            message: e
        })
    }
}

const view = async (req, res) => {
    try {
        const dataItem = await prisma.iklan.findUnique({
            where: {
                id: req.params.id
            },
            include: {
                User: true,
                Provinsi: true

            }
        })

        const updated = updateData(dataItem)

        res.status(200).json(updated)
    } catch (e) {
        res.status(500).json({
            message: e
        })
    }
}

const kategori = async (req, res) => {
    try {
        const data = await prisma.kategori.findMany()

        const updated = updateData(data)

        res.status(200).json(updated)
    } catch (e) {
        res.status(500).json({
            message: e
        })
    }
}

const kategoriItems = async (req, res) => {
    try {
        const data = await prisma.kategori.findUnique({
            where: {
                slug: req.params.slug
            },
            include: {
                Iklan: true
            }
        })

        const updated = updateData(data)

        res.status(200).json(updated)
    } catch (e) {
        res.status(500).json({
            message: e
        })
    }
}


module.exports = { home, view, kategori, kategoriItems }