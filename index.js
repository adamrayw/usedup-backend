const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "https://usedup.herokuapp.com/"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (req, res) => {
    res.json({
        message: 'Hello!'
    })
})

app.use('/api/', userRoutes)

app.listen(process.env.PORT || 8080, () => {
    console.log(`Server running...`)
})