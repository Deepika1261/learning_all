/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
 exports.up = function (knex) {
    return knex.schema.createTable('todoTable', table => {
      table.increments();
      table.text('title');
      table.datetime('time', { precision: 6 }).defaultTo(knex.fn.now(6));
      table.boolean('done');
    }
    )
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('todoTable')
  };