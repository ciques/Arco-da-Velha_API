const express = require('express')
const routes = express.Router()

const UserController = require ('./controllers/UserController')
const ProductsController = require ('./controllers/ProductsController')

routes.post('/login', UserController.login)
routes.post('/listProducts', ProductsController.list)

module.exports = routes