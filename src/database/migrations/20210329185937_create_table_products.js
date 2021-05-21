
exports.up = knex => knex.schema.createTable('products', table => {
    table.increments('id')
    table.string('name')
    table.string('artist')
    table.float('price')
    table.string('type')
    table.timestamps()  
})

exports.down = knex => knex.schema.dropTable('products')