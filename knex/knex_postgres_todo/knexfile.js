// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database: 'postgres',
      user:     'postgres',
      password: 'password123',
    },
    useNullAsDefault:true,
    pool: {
      min: 2,
      max: 10
    },
  }
};
