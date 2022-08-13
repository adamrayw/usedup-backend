const express = require('express');
const userRoutes = require('./routes/userRoutes');
const cors = require('cors');

const app = express()

var allowedOrigins = ['https://usedup.vercel.app/login', 'https://usedup.vercel.app/register', 'https://usedup.herokuapp.com/api/login'];

app.use(cors({

    origin: function (origin, callback) {
        // allow requests with no origin
        // (like mobile apps or curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            var msg = 'The CORS policy for this site does not ' +
                'allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },

    exposedHeaders: ['Content-Length', 'X-Foo', 'X-Bar'],

    credentials: true,
}));

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