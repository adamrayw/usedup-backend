const express = require('express');
const userRoutes = require('./routes/userRoutes');
const formRoutes = require('./routes/formRoutes');
const homeRoute = require('./routes/homeRoute');
const chatRoutes = require('./routes/chatRoutes');
const cors = require('cors');
const { Server } = require('socket.io')

const http = require('http');
const app = express()
const server = http.createServer(app)

app.use(cors());

// Socket.io
const io = new Server(server, {
    cors: {
        // origin: "http://localhost:3000",
        origin: "https://usedup.vercel.app",
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("join_room", (data) => {
        socket.join(data.room)
    })

    socket.on("send_message", (data) => {
        console.log(data);
        socket.to(data.room).emit("receive_message", data)
    })
})

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
app.use('/api/', chatRoutes)


server.listen(3001, () => {
    console.log('Socket running...');
})
app.listen(process.env.PORT || 8080, () => {
    console.log(`Server running...`)
})