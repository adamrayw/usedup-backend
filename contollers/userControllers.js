// prisma client
const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const prisma = new PrismaClient()
// Setup JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

const userRegister = async (req, res) => {
    // get parameter
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        res.status(400)
        res.json({ message: 'Please add all fields' })
    }

    // check jika user sudah ada
    const checkUser = await prisma.user.findUnique({
        where: {
            email: email,
        }
    })

    // if user existed
    if (checkUser) {
        res.status(400)
        res.json({ message: 'User already exist' })
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // create user 
    const user = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword
        }
    })

    if (user) {
        res.status(201).json({
            id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user.id)
        })
    } else {
        res.status(400)
        res.json({ message: 'invalid user data' })
    }
}

const userLogin = async (req, res) => {
    const { email, password } = req.body

    // check if existed
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (user) {
        // compare password
        bcrypt.compare(password, user.password, function (err, result) {
            if (result === true) {
                res.json({
                    id: user.id,
                    name: user.name,
                    email: user.email,
                    token: generateToken(user._id)
                })
            } else {
                res.status(400)
                res.json({ message: 'invalid credentials' })
            }
        });
    }


}

module.exports = { userRegister, userLogin }