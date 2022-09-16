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
            orderBy: [
                {
                    createdAt: 'desc'
                }
            ],
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

const updateDilihat = async (req, res) => {
    try {
        console.log(req.body);
        const dataItem = await prisma.iklan.update({
            where: {
                id: req.params.id,
            },
            data: {
                dilihat: req.body.dilihat
            }
        })

        const serialized = updateData(dataItem)

        res.status(200).json(serialized)
    } catch (e) {
        res.json(e)
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
                        iklan: {
                            include: {
                                Provinsi: true,
                                Favorit: true
                            }
                        }
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

const search = async (req, res) => {
    const keyword = req.query.keyword
    const replaced = keyword.replaceAll(' ', ' & ')
    try {
        const response = await prisma.iklan.findMany({
            where: {
                judul_iklan: {
                    search: replaced
                }
            }
        })

        const serialized = updateData(response)

        res.json(serialized)
    } catch (error) {
        res.json(error)
    }
}

const iklanSaya = async (req, res) => {
    const data = await prisma.user.findUnique({
        where: {
            id: '672eb266-0e34-4dc9-b3b3-d9db1db41e55'
        },
        include: {
            iklans: {
                include: {
                    Favorit: true
                }
            }
        }
    })

    const serialized = updateData(data)

    res.json(serialized)
}


module.exports = { home, view, kategori, kategoriItems, deleteData, favorit, tambahFavorit, hapusFavorit, search, updateDilihat, iklanSaya }