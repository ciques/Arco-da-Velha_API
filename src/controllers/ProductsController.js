const knex = require('../database')

module.exports = {    
    async listProduct(req, res, next) {
        try {
            const payload = req.body
            console.log(payload)
            if(payload.filter) {
                const results = await knex('products').orderBy('title')
                    .where('title', 'ilike', `%${payload.filter.toLowerCase()}%`)
                    .orWhere('artist', 'ilike', `%${payload.filter.toLowerCase()}%`)
                .paginate({ perPage: payload.pageSize, currentPage: payload.page });

                return res.json(results)
            }

            const results = await knex('products').orderBy('title')
                .paginate({ perPage: payload.pageSize, currentPage: payload.page });
            return res.json(results)
        } catch (error) {
            next(error)
        }

    },

    async addProduct(req, res, next) {
        const product = req.body

        if(!product.title) {
            return res.status(400).send({error: 'Título não informado'})
        }

        if(!product.artist) {
            return res.status(400).send({error: 'Artista não informado'})
        }

        if(!product.type) {
            return res.status(400).send({error: 'Tipo não informado'})
        }

        try {
            const results = await knex('products').insert({   
                title : product.title,
                artist: product.artist,
                type: product.type,
                price: product.price
            }).returning('*')

            return res.json(results)

        } catch (error) {
            next(error)
        }
        
        next();
    },

    async removeProduct(req, res, next) {
        const product = req.body

        try {
            const results = await knex('products').where('id', product.id).del();
            return res.json({message: 'Success deleted disco' + product.id})

        } catch (error) {
            next(error)
        }
        
        next();
    },

    async updateProduct(req, res, next) {
        const product = req.body.product

        try {
            const results = await knex('products')
                .where({ id: product.id })
                .update({   
                    title: product.title,
                    artist: product.artist,
                    type: product.type,
                    price: product.price
                }, ['*'])
            console.log(results);
            return res.json({message: 'disco atualizado ' + results})

        } catch (error) {
            next(error)
        }
        
        next();
    }
}