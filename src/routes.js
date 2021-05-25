const express = require('express')
const routes = express.Router()
const authMiddleware = require('./middlewares/auth')

const AuthController = require ('./controllers/AuthController')
const ProductsController = require ('./controllers/ProductsController')

routes.post('/register', AuthController.register)
routes.post('/login', AuthController.login)
routes.post('/listProducts', ProductsController.listProduct)
routes.post('/addProducts', authMiddleware, ProductsController.addProduct)

module.exports = routes