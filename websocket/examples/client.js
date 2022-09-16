const { io } = require("socket.io-client");
const socket = io("http://localhost:3000")

socket.on("connect",()=>{
    console.log("client connected")
})
socket.emit('primary-event', "events handled");