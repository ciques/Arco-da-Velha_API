const express = require('express')
const routes = express.Router()
const authMiddleware = require('./middlewares/auth')

const AuthController = require ('./controllers/AuthController')
const ProductsController = require ('./controllers/ProductsController')

routes.post('/register', AuthController.register)
routes.post('/login', AuthController.login)
routes.post('/listProducts', ProductsController.listProduct)
routes.post('/addProducts', authMiddleware.verify, ProductsController.addProduct)
routes.post('/removeProducts', authMiddleware.verify, ProductsController.removeProduct)
routes.post('/updateProducts', authMiddleware.verify, ProductsController.updateProduct)
routes.post('/refresh', authMiddleware.verify, authMiddleware.refresh)

module.exports = routes