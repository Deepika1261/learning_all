const express = require('express')
const Todos = require('./models/todoHelpers')
const app = express()
const port = 3000

class Server{
    constructor(){
        this.useMiddleware()
        this.addtodoRoutes()
        this.listenServer()
    }
    useMiddleware(){
        app.use(express.json());
    }
    addtodoRoutes(){
        app.post('/todo',async (req,res)=>{
            try{
                var todo_obj={
                    title:req.body.title,
                    time:new Date(Date.now()),
                    done:false
                }
                const added_todo = await Todos.add_todo(todo_obj)
                res.status(200).json(added_todo)
            }
            catch(err){
                console.log(err);
                res.status(500).send('Sorry, we cannot add!')
            }
        }),
        app.post('/update_todo',async (req,res)=>{
            try{
                let done_status=false
                const todo_data = await Todos.get_todo(req.query.id)
                if(todo_data.done==false){
                    done_status=true
                }
                const updated_todo = await Todos.toggle_todo(req.query.id,{'done':done_status})
                res.status(200).json(updated_todo) 
            }
            catch(err){
                console.log(err);
                res.status(500).send('Sorry, we cannot update!')            
            }
        }),
        app.delete('/todo',async (req,res)=>{
            try{
                const deleted_todo = await Todos.delete_todo(req.query.id);
                res.status(200).json(deleted_todo);
            }
            catch(err){
                console.log(err);
                res.status(500).send('Sorry, we cannot delete!') 
            }
        })
    }
    listenServer(){
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}, http://localhost:3000`)
          }) 
    }
}

new Server()