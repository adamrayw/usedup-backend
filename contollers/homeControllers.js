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
    const result = req.query.result
    try {
        // const data = await prisma.iklan.findMany()
        const data = await prisma.iklan.findMany({
            take: Number(result),
            include: {
                Provinsi: true,
                Favorit: true
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
                Provinsi: true,
                Kategori: true,
                Favorit: {
                    include: {
                        User: true
                    }
                }
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
                Iklan: {
                    include: {
                        Provinsi: true,
                        Favorit: true
                    }
                }
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

const deleteData = async (req, res) => {
    try {
        const response = await prisma.iklan.deleteMany()

        res.status(200).json({
            message: 'Delete successfully',
            data: response
        })
    } catch (error) {
        console.log(error);
    }
}

const favorit = async (req, res) => {
    const id = req.query.id
    try {
        const user = await prisma.user.findUnique({
            where: {
                id
            },
            include: {
                favorits: {
                    include: {
                        Iklan: true
                    }
                }
            }
        })

        const serialized = updateData(user)

        res.json(serialized)
    } catch (error) {
        res.json(error)
    }
}

const tambahFavorit = async (req, res) => {
    const userId = req.body.userId
    const iklanId = req.body.iklanId
    try {
        const response = await prisma.favorit.create({
            data: {
                userId,
                iklanId
            }
        })

        res.status(200).json({
            message: response
        })
    } catch (error) {
        res.json(error)
    }
}

const hapusFavorit = async (req, res) => {
    const id = req.body.id
    try {
        const response = await prisma.favorit.delete({
            where: {
                id: id,
            }
        })

        res.status(200).json({
            message: response
        })
    } catch (error) {
        res.json(error)
    }
}


module.exports = { home, view, kategori, kategoriItems, deleteData, favorit, tambahFavorit, hapusFavorit }