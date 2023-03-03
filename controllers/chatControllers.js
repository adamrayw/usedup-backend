const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const chat = async (req, res) => {
    const id = req.params.id

    try {
        const response = await prisma.user.findUnique({
            where: {
                id
            },
            select: {
                Participant: {
                    include: {
                        Room: {
                            include: {
                                Message: {
                                    orderBy: {
                                        createdAt: 'desc'
                                    },

                                },
                                Participant: {
                                    include: {
                                        User: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        })

        res.status(200).json({
            message: response
        })
    } catch (error) {
        res.status(400).json({
            status: 400,
            message: error
        })
    }
}

const getChatMsg = async (req, res) => {
    const roomId = req.params.roomId

    // try {
    const response = await prisma.room.findUnique({
        where: {
            id: roomId
        },
        include: {
            Message: {
                orderBy: {
                    createdAt: "asc"
                }
            }
        },
    })

    res.status(200).json({
        response
    })
    // } catch (error) {
    //     res.status(400).json({
    //         error
    //     })
    // }
}

const sendMessage = async (req, res) => {
    const userId = req.body.userId
    const roomId = req.body.roomId
    const message = req.body.message

    try {
        const response = await prisma.message.create({
            data: {
                userId,
                roomId,
                message
            }
        })
        res.status(200).json({
            response,
            data: {
                userId,
                roomId,
                message
            }
        })
    } catch (error) {
        res.status(400).json({
            message: 'Something went wrong'
        })
    }
}

const createRoom = async (req, res) => {
    const userId1 = req.body.userId1
    const userId2 = req.body.userId2

    // try {
    const checkExistingUser = await prisma.user.findUnique({
        where: {
            id: userId1
        },
        select: {
            Participant: {
                include: {
                    Room: {
                        include: {
                            Participant: {
                                where: {
                                    userId: userId2
                                }
                            }
                        }
                    }
                }
            }
        }
    })

    // let isExisting = checkExistingUser.Participant[0].Room.Participant.length < 1 || checkExistingUser.Participant.length < 1

    if (checkExistingUser === null || checkExistingUser.Participant.length < 1) {
        try {
            const response = await prisma.room.create({
                data: {
                    name: 'new',
                    Participant: {
                        create: [
                            { userId: userId1 },
                            { userId: userId2 }
                        ]
                    }
                }
            })

            res.status(200).json({
                status: true,
                response
            })
        } catch (error) {
            res.status(400).json({
                status: false,
                message: error
            })
        }
    } else {
        res.json({
            status: false,
            message: 'Room sudah ada!'
        })

    }
    // } catch (err) {
    //     res.json({ err });
    // }


}

module.exports = { chat, getChatMsg, sendMessage, createRoom }