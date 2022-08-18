const jwt = require('jsonwebtoken')

const validateToken = async (req, res, next) => {
    let token

    const authorizationHeader = req.headers.authorizationHeader

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
        token = req.headers.authorization.split(' ')[1]

        // verify token
        jwt.verify(token, process.env.JWT_SECRET)

        next()
    } else {
        res.status(401).json({
            message: 'Not authorized, no token'
        })
    }
}

module.exports = { validateToken }