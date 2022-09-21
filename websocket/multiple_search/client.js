
const socket = io("http://localhost:3000");

socket.on("connect",()=>{
    console.log("client connected")
})

const response_area = document.getElementById('#box');

function showResponse(content) {
response_area.textContent += `\n\n${content}`;
response_area.scrollTop = response_area.scrollHeight;
}

