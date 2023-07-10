const {body} = require('express-validator'); 
const validatorResult = require('../validatorResult');
const Category = require('../../models/Category');

exports.createProductValidator = [
    body('title').trim()
    .notEmpty().withMessage('the title is required')
    .isString().withMessage('the title must be string')
    .isLength({min : 2}).withMessage('the title is to short')
    .isLength({max : 20}).withMessage('the title is to long'),
    body('description').trim()
    .notEmpty().withMessage('the dascription is required')
    .isString().withMessage('the dascription must be string')
    .isLength({min : 4}).withMessage('the dascription is to short')
    .isLength({max : 200}).withMessage('the dascription is to long'),
    body('price').trim()
    .notEmpty().withMessage('the price is required')
    .isFloat(),
    body('weight').trim()
    .isFloat(),
    body('categoryId').trim()
    .isInt()
    .custom(async(value , {req , res , next})=>{
            const category =await Category.findOne({where : {id : value}});
            if(category){
                return true ;
            }else{
                throw new Error('this category id is not exsit '); 
            }
        }),
    validatorResult
];