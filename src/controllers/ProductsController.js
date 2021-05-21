const knex = require('../database')

module.exports = {
    async list(req, res) {
        const results = await knex('products')

        return res.json(results)
    }
}