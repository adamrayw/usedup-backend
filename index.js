const express = require('express');
const userRoutes = require('./routes/userRoutes');

const port = process.env.PORT || 8080
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', async (req, res) => {

    const created = await prisma.user.create({
        data: {
            name: 'Adam',
            email: 'raywibowo68@gmail.com',
            password: '12345678'
        }
    })

    res.json({
        'message': created
    })
})

app.use('/api/', userRoutes)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
})