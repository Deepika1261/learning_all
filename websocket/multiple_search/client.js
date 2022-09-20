const { io } = require("socket.io-client");
const socket = io("http://localhost:3000");
const axios = require('axios');

socket.on("connect",()=>{
    console.log("client connected")
})

/*socket.emit("primary-event", arg1, arg2, (response) => {
    console.log(response.status); // ok
  });*/

