const express = require('express');
const router = express.Router(); 
const {createProduct , 
        getProducts , 
        getProductsForCategory , 
        getProduct,
        popularItem
    } = require('../controllers/product'); 
const {createProductValidator} = require('../util/validation/productValidation');
const {addRate} = require('../controllers/rate');
const {authLocal , authJwt} = require('../util/passport');

router.post('/create-product',createProductValidator , createProduct);
router.get('/get-products',getProducts) ; 
router.get('/get-products-for-category',getProductsForCategory);
router.post('/add-rate',authJwt,addRate);
router.get('/get-product',getProduct);
router.get('/popular-products',popularItem);

module.exports = router ; 