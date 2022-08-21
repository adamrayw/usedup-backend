const express = require('express');
const userRoutes = require('./routes/userRoutes');
const formRoutes = require('./routes/formRoutes');
const homeRoute = require('./routes/homeRoute');
const cors = require('cors');

const app = express()

app.use(cors());

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.json({
        message: 'Hello!'
    })
})

app.use('/api/', userRoutes)
app.use('/api/', formRoutes)
app.use('/api/', homeRoute)

app.listen(process.env.PORT || 8080, () => {
    console.log(`Server running...`)
})