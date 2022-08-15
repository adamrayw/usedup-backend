const express = require('express');
const userRoutes = require('./routes/userRoutes');
const formRoutes = require('./routes/formRoutes');
const cors = require('cors');

const app = express()

app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Headers, *, Access-Control-Allow-Origin', 'Origin, X-Requested-with, Content_Type,Accept,Authorization', 'http://localhost:4200');
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({});
    }
    next();
});

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.get('/', (req, res) => {
    res.json({
        message: 'Hello!'
    })
})

app.use('/api/', userRoutes)
app.use('/api/', formRoutes)

app.listen(process.env.PORT || 8080, () => {
    console.log(`Server running...`)
})