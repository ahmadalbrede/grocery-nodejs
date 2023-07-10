const {body} = require('express-validator');
const validatorResult = require('../validatorResult')
const Sequelize = require('sequelize'); 
const Category = require('../../models/Category');
exports.createCategoryValidator = [
    body('title').trim()
    .notEmpty().withMessage('the title is required')
    .isString().withMessage('the title must be string')
    .isLength({min : 2}).withMessage('the title is to short')
    .isLength({max : 20}).withMessage('the title is to long'),
    // body('image').trim()
    // .notEmpty().withMessage('the image is required'),
    body('parent_id')
    .optional()
    .isInt().withMessage('the parent_id must be integer')
    .custom(async(value , {req})=> {
        const result = await Category.findOne({where : {id : value}});
            if(result){
                return true ;
            }else {
                throw new Error('this parent_id is not exsit ');
            }
        
    }),
    validatorResult
]