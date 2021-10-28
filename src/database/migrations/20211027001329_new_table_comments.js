
const { onUpdateTrigger } = require('../../../knexfile')

exports.up = knex => knex.schema.createTable('comments', table => {
    table.increments('id')
    table.text('comment')
    table.integer('user_id')
    table.integer('product_id')
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
}).then(() => knex.raw(onUpdateTrigger('products')))

exports.down = knex => knex.schema.dropTable('comments')    