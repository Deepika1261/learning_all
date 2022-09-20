const app = require("express")();
const { createServer } = require("http");
const { Server } = require("socket.io");
const sqlite3 = require('sqlite3')

const httpServer = createServer(app);
const io = new Server(httpServer, { cors:{origin:'*'} });

io.on("connection", (socket) => {
    console.log(socket.id)
    socket.on('primary-event', (arg1, arg2, callback)=>{
        console.log(arg1);
        console.log(arg2);
        callback({
            status:'ok'
        }
        );
    });
    socket.on('start_timer',(data)=>{
      socket.timeout(5000).emit('process_complete',(err)=>{
          socket.emit('fetch_database',"hello")
      })
  })
});

httpServer.listen(3000);