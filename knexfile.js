knexfilerequire('dotenv').config()
const pg = require('pg')
pg.defaults.ssl = true

module.exports = {
    client: 'postgresql',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    migrations :{
      tableName: 'knex_migration',
      directory: `${__dirname}/src/database/migrations` 
    }
  }