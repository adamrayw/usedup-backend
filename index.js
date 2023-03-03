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

app.use(cors({ origin: '*' }));

// Socket.io
const io = new Server(server)

// create a new notification

// create a new notification

// emit a notification event to all connected clients

io.on("connection", (socket) => {
    console.log(socket.id);

    const notification = {
        id: 1,
        message: 'New notification',
    };

    socket.on('notification', () => {
        console.log('notif')
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


// server.listen(process.env.PORT || 3000, () => {
//     console.log('Server running...');
// })
server.listen(3001, () => {
    console.log('Server running...' + process.env.PORT);
})