const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()

const hapusIklan = async (req, res) => {
    const idIklan = req.body.id

    try {
        const deleteFavorit = prisma.favorit.deleteMany({
            where: {
                iklanId: idIklan
            }
        })

        const deleteIklan = prisma.iklan.delete({
            where: {
                id: idIklan
            }
        })


        await prisma.$transaction([deleteFavorit, deleteIklan])

        res.status(200).json({
            status: true,
            message: "delete successfully",
        })
    } catch (error) {
        res.status(400).json({
            status: false,
            message: "something went wrong!",
            data: []
        })
    }
}


module.exports = { hapusIklan }