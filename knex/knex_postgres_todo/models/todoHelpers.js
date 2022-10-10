const knex = require('knex');
const config = require('../knexfile');
const db = knex(config.development);
module.exports = {
    add_todo,
    toggle_todo,
    delete_todo,
    get_todo
};

async function add_todo(todo) {
    const id = await db('todoTable').insert(todo);
    return id.rowCount
}
async function get_todo(id){
    const todo = await db('todoTable').where( 'id', id ).select().then(result => result[0]);
    return todo
}
async function toggle_todo(id, todo) {
    const updated_todo = await db('todoTable').where('id', id).update(todo, ['id','title','done'], { includeTriggerModifications: true })
    return updated_todo
}

async function delete_todo(id) {
    const deleted_todo = await db('todoTable').where('id', id ).del(['id'])
    return deleted_todo
}