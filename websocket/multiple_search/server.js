const app = require("express")();
const { createServer } = require("http");
const { Server } = require("socket.io");
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database/Details.db');

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
    socket.on('find_search',(query)=>{
        datasource1(query, io);
        datasource2(query, io);
        datasource3(query, io);
        socket.timeout(8000).emit('done',(err)=>{
            //fetch from db
        })
    });
});

function datasource1(query, io){
    let sql = `SELECT ID id ,
                  NAME name ,
                  EMAIL email
            FROM employee
            WHERE id < ?
            ORDER BY id`;
    db.each(sql, [query], (err, row) => {
        if (err) {
            throw err;
        }
        io.emit("resutsl", row)
    });
    
}

function datasource2(query, io){
    let sql = `SELECT ID id ,
                NAME name ,
                EMAIL email
            FROM employee
            WHERE id < ?
            ORDER BY id`;
    db.each(sql, [query], (err, row) => {
        if (err) {
            throw err;
        }
        io.emit("resuts2", row)
    });
}

function datasource3(query, io){
    let sql = `SELECT ID id ,
                NAME name ,
                EMAIL email
            FROM employee
            WHERE id < ?
            ORDER BY id`;
    db.each(sql, [query], (err, row) => {
        if (err) {
            throw err;
        }
        io.emit("resuts3", row)
    });
}



httpServer.listen(3000);