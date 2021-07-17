const knex = require('../database')

module.exports = {    
    async listProduct(req, res, next) {
        const payload = req.body

        const results = await knex('products').orderBy('name')
            .paginate({ perPage: payload.pageSize, currentPage: payload.page });
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

            return res.json(teste)

        } catch (error) {
            next(error)
        }
        
        next();
    }
}