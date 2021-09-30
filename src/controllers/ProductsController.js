const { query } = require('express');
const knex = require('../database')

module.exports = {    
    async listProduct(req, res, next) {
        try {
            const payload = req.body
            console.log(payload)

            const results = knex('products')
                .modify(function(queryBuilder) {
                    if(payload.filterPost) {
                        queryBuilder.where('title', 'ilike', `%${payload.filterPost.toLowerCase()}%`)
                            .orWhere('artist', 'ilike', `%${payload.filterPost.toLowerCase()}%`)
                            .orWhere('genre', 'ilike', `%${payload.filterPost.toLowerCase()}%`)
                            .orWhere('type', 'ilike', `%${payload.filterPost.toLowerCase()}%`)
                    }
                    if(payload.order == 'pricedesc') {
                        queryBuilder.orderBy('price', 'desc')
                    }
                    if(payload.order == 'pricecres') {
                        queryBuilder.orderBy('price')
                    }
                    if(payload.order == 'artist') {
                        queryBuilder.orderBy('artist')
                    }
                    if(payload.order == 'name') {
                        queryBuilder.orderBy('title')
                    }
                })
                .paginate({ perPage: payload.pageSize, currentPage: payload.page });
                 


            results.then(function(results) {
                //query success
                res.send(results);
              })
              .then(null, function(err) {
                //query fail
                res.status(500).send(err);
              });

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

        if(!product.genre) {
            return res.status(400).send({error: 'Genero não informado'})
        }

        if(!product.release_date) {
            return res.status(400).send({error: 'Data de Lançamento não informado'})
        }

        if(!product.state) {
            return res.status(400).send({error: 'Estado não informado'})
        }

        try {
            const results = await knex('products').insert({   
                title : product.title,
                artist: product.artist,
                type: product.type,
                price: product.price,
                genre: product.genre,
                release_date: product.release_date,
                state: product.state
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
                    price: product.price,
                    genre: product.genre,
                    release_date: product.release_date,
                    state: product.state
                }, ['*'])
            console.log(results);
            return res.json({message: 'disco atualizado ' + results})

        } catch (error) {
            next(error)
        }
        
        next();
    },

    async showProduct(req, res, next) {
        const id = req.body.id

        try {
            const results = await knex('products')
                .where({ id: id })

            console.log(results);
            return res.json(results)

        } catch (error) {
            next(error)
        }
        
        next();
    },

    async listCategories(req, res, next) {
        const artists = []
        const genres = []
        const types = []
        try {
            const artistsB = await knex('products')
                .distinct('artist').whereNotNull('artist')
                .orderBy('artist')         
            const genresB = await knex('products')
                .distinct('genre').whereNotNull('genre')
                .orderBy('genre')
            const typesB = await knex('products')
                .distinct('type').whereNotNull('type')
                .orderBy('type')
                

            artistsB.forEach(e => {
               artists.push(e.artist) 
            });

            genresB.forEach(e => {
                genres.push(e.genre) 
             });

            typesB.forEach(e => {
                types.push(e.type) 
            });

            return res.json({
                artists,
                genres,
                types 
            })  

        } catch (error) {
            next(error)
        }

    },
}