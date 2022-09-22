const app = require("express")();
const { createServer } = require("http");
const { Server } = require("socket.io");
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('./database/Details.db');

const httpServer = createServer(app);
const io = new Server(httpServer, { cors:{origin:'*'} });

io.on("connection", (socket) => {
    console.log(socket.id)

    socket.on('find_search1',(query)=>{
        datasource1(query, io);
        socket.timeout(8000).emit('complete_results',(err)=>{
            let sql = `SELECT ID id ,
                        NAME name ,
                        EMAIL email ,
                        CITY city
                FROM startup
                WHERE id < ?
                ORDER BY id`;
            db.each(sql, [query], (err, row) => {
            if (err) {
                throw err;
            }
            else{
                socket.emit("resultsl", row)
            }
            });
        })
    });
    socket.on('find_search2',(query)=>{
        datasource2(query, io);
        socket.timeout(8000).emit('complete_results',(err)=>{
            let sql = `SELECT ID id ,
                        NAME name ,
                        EMAIL email 
                FROM professional
                WHERE id < ?
                ORDER BY id`;
            db.each(sql, [query], (err, row) => {
            if (err) {
                throw err;
            }
            else{
                socket.emit("results2", row)
            }
            });
        })
    });
    socket.on('find_search3',(query)=>{
        datasource3(query, io);
        socket.timeout(8000).emit('complete_results',(err)=>{
            let sql = `SELECT ID id ,
                        NAME name 
                FROM Artist
                WHERE id < ?
                ORDER BY id`;
            db.each(sql, [query], (err, row) => {
            if (err) {
                throw err;
            }
            else{
                socket.emit("results3", row)
            }
            });
        })
    });
});

async function datasource1(query, socket){
    let sql = `SELECT ID id ,
                  NAME name ,
                  EMAIL email, 
                  CITY city
            FROM startup
            WHERE id < ?
            ORDER BY id`;
    db.each(sql, [query], (err, row) => {
        if (err) {
            throw err;
        }
        else{
            socket.emit("resultsl", row)
        }

    });
    
}

async function datasource2(query, io){
    let sql = `SELECT ID id ,
                NAME name ,
                EMAIL email
            FROM professional
            WHERE id < ?
            ORDER BY id`;
    db.each(sql, [query], (err, row) => {
        if (err) {
            throw err;
        }
        io.emit("results2", row)
    });
}

async function datasource3(query, io){
    let sql = `SELECT ID id ,
                NAME name 
            FROM Artist
            WHERE id < ?
            ORDER BY id`;
    db.each(sql, [query], (err, row) => {
        if (err) {
            throw err;
        }
        io.emit("results3", row)
    });
}



httpServer.listen(3000);