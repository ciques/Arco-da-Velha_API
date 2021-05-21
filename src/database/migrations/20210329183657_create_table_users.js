
exports.up = knex => knex.schema.createTable('users', table => {
        table.increments('id')
        table.string('name')
        table.string('email').unique().notNullable()
        table.string('password')
        table.boolean('is_admin').defaultTo(false)
        table.timestamps()  
    })

exports.down = knex => knex.schema.dropTable('users')

