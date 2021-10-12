const express = require('express')
const routes = express.Router()
const multer = require('multer')
const multerConfig = require("./config/multer");

const authMiddleware = require('./middlewares/auth')
const AuthController = require ('./controllers/AuthController')
const ProductsController = require ('./controllers/ProductsController')
const ImagesController = require ('./controllers/ImagesController')

// Open
routes.post('/register', AuthController.register)
routes.post('/login', AuthController.login)
routes.post('/listProducts', ProductsController.listProduct)
routes.post('/product', ProductsController.showProduct)
routes.get('/listCategories', ProductsController.listCategories)


// Autheticated
routes.post('/addProducts', authMiddleware.verify, ProductsController.addProduct)
routes.post('/removeProducts', authMiddleware.verify, ProductsController.removeProduct)
routes.post('/updateProducts', authMiddleware.verify, ProductsController.updateProduct)
routes.post('/refresh', authMiddleware.verify, authMiddleware.refresh)

// Admin 
routes.post('/uploadImages',  authMiddleware.verify, multer(multerConfig).single("image"), ImagesController.uploadImages)

module.exports = routes