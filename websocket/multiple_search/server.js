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
          //retrieve from database
      })
  })
});

httpServer.listen(3000);

/*wss.on('connection', function connection(ws) {
  ws.on('message', function message(data) {
    console.log('server received: %s', data);
  });
  ws.send('Hello from server');
});

socket.setTimeout(function () {
  console.log('5 seconds passed, closing the socket');
  socket.close();
}, 5000);

app.get('/get1',(req,res)=>{
  const data1 = instance.get("https://reqres.in/api/users?page=1");
  ws.send(data1);
})
app.get('/get2',(req,res)=>{
  const data2 = instance.get("https://reqres.in/api/unknown");
  ws.send(data2);
})
app.get('/get3',(req,res)=>{
  const data3 = instance.get("https://reqres.in/api/users?delay=3");
  ws.send(data3);
})
app.get('/get4',(req,res)=>{
  const data4 = instance.get("https://reqres.in/api/users/2");
  ws.send(data4);
})

server.listen(port, function() {
  console.log(`Server is listening on ${port}!`)
})*/