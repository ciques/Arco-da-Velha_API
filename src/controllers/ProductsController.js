const knex = require('../database')

module.exports = {
    async listProduct(req, res, next) {
        const results = await knex('products')

        return res.json(results)
    },

    async addProduct(req, res, next) {
        const product = req.body

        if(!product.name) {
            return res.status(400).send({error: 'Nome não informado'})
        }

        if(!product.artist) {
            return res.status(400).send({error: 'Artista não informado'})
        }

        if(!product.type) {
            return res.status(400).send({error: 'Tipo não informado'})
        }

        try {
            teste = await knex('products').insert({   
                name : product.name,
                artist: product.artist,
                type: product.type,
                price: product.price
            }).returning('*')

        } catch (error) {
            next(error)
        }


        return res.json(teste)
    }
}