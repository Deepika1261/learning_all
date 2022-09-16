const express = require('express');
const http = require('http');
const WebSocket = require('k6/ws');
const socket = require('k6/ws');
const app = express();
const port = 3000;
const server = http.createServer(express);
const wss = new WebSocket.Server({ server })
const axios = require('axios').default;
const instance = axios.create();

wss.on('connection', function connection(ws) {
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
})