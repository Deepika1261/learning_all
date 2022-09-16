const app = require("express")();
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });

io.on("connection", (socket) => {
    console.log(socket.id)
    socket.on('primary-event',data =>{
        console.log(data)
    })
});

httpServer.listen(3000);