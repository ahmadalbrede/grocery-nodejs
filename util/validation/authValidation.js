const {body , check } = require('express-validator'); 
const validatorResult = require('../validatorResult');
exports.loginValidatior = [
    body('mobileNumber').trim()
    .notEmpty().withMessage('the mobile number is required ')
    .isNumeric().withMessage('must be just number'),
    // .isInt({max : 10 , min : 10}).withMessage('must 10 numbers'),
    body('password').trim()
    .notEmpty().withMessage('the password is required')
    .isString().withMessage('the password must be string ')
    .isLength({min : 8}).withMessage('the password is too short')
    .isLength({max : 20}).withMessage('the password is too long'),
    validatorResult
];
exports.signUpValidatior = [
    body('mobileNumber').trim()
    .notEmpty().withMessage('the mobile number is required ')
    .isMobilePhone().withMessage('the mobile number format is not correct'),
    // .isNumeric().withMessage('must be just number')
    // .isInt({max : 10 , min : 10}).withMessage('must 10 numbers'),
    body('password').trim()
    .notEmpty().withMessage('the password is required')
    .isString().withMessage('the password must be string ')
    .isLength({min : 8}).withMessage('the password is too short')
    .isLength({max : 20}).withMessage('the password is too long'),
    body('name').trim()
    .notEmpty().withMessage('the name is required')
    .isString().withMessage('the name must be string '),
    body('address').trim()
    .notEmpty().withMessage('the address is required'),
    body('confirmPassword').trim()
    .notEmpty().withMessage('the password is required')
    .custom((value , {req})=>{
        if(value === req.body.password){
            return true ;
        }else {
            throw new Error('check from passport...'); 
        }
    }),
    validatorResult
];
