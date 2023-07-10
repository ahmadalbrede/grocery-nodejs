const express = require('express'); 
const router = express.Router(); 
const {createOrder,addProductToCart , getOrder} = require('../controllers/order'); 
const {authJwt} = require('../util/passport');


router.post('/create-order', authJwt , createOrder) ;
router.post('/add-product-to-cart',addProductToCart);
router.get('/get-order', getOrder);

module.exports = router ; 