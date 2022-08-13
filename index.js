const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.json({
        message: 'Hello!'
    })
})

app.use('/api/', userRoutes)

app.listen(process.env.PORT || 8080, () => {
    console.log(`Server running...`)
})