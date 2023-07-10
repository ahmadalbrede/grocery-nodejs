const express = require('express'); 
const router  = express.Router(); 
const {createCategory ,
        getCategories,
        getCategoriesForCategory
    } = require('../controllers/category');
const {createCategoryValidator} = require('../util/validation/categoryValidation');


router.post('/create-category',createCategoryValidator,createCategory);
router.get('/get-categories' , getCategories);
router.get('/get-categories-for-category',getCategoriesForCategory)

module.exports = router ; 