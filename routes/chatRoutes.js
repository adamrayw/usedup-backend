const express = require("express");
const { chat, getChatMsg, sendMessage, createRoom } = require("../controllers/chatControllers");
const router = express.Router()

router.get('/chat/index/:id', chat)
router.get('/chat/msg/:roomId', getChatMsg)
router.post('/chat/send/msg', sendMessage)
router.post('/chat/create/room', createRoom)

module.exports = router