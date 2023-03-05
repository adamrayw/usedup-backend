const express = require('express');
const userRoutes = require('./routes/userRoutes');
const formRoutes = require('./routes/formRoutes');
const homeRoute = require('./routes/homeRoute');
const chatRoutes = require('./routes/chatRoutes');
const iklanRoutes = require('./routes/IklanRoutes');
const cors = require('cors');
const socketio = require('socket.io')

const http = require('http');
const app = express()
const server = http.createServer(app)

app.use(cors());

// Socket.io
const io = socketio(server, {
    cors: {
        origin: '*',
        credentials: true
    }
})

// create a new notification

// create a new notification

// emit a notification event to all connected clients

io.on("connection", (socket) => {

    socket.to('446dbe1f-b3d8-4445-8660-9f065fd01d92').emit("receive_message", "data")

    socket.on('notification', (data) => {
        console.log("Welcomr")
        socket.emit("notification", data)
    });

    socket.on("join_room", (data) => {
        socket.join(data.room)
    })

    /* Listening for a message from the client and then sending it to the room. */
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
app.use('/api/', iklanRoutes)


server.listen(process.env.PORT || 3001, () => {
    console.log('Server running...');
})
// server.listen(3001, () => {
//     console.log('Server running...' + process.env.PORT);
// })
