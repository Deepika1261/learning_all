const { io } = require("socket.io-client");
const socket = io("http://localhost:3000");
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database/Details.db');
socket.on('fetch_database',()=>{
    for(let i=1; i<=8; i++){
        entry = db.each('SELECT id ID, name NAME, email EMAIL FROM employee WHERE id =?',[i]);
        console.log(entry)
    }
})

