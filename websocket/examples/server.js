const app = require("express")();
const { createServer } = require("http");
const { Server } = require("socket.io");

const httpServer = createServer(app);
const io = new Server(httpServer, { cors:{origin:'*'} });

io.on("connection", (socket) => {
    console.log(socket.id)

    socket.on('check',()=>{
        console.log("handeled")
    }
    )
})


httpServer.listen(3000);