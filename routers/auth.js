const express = require('express'); 
const router = express.Router();
const {authLocal , authJwt} = require('../util/passport');
const {signUp , login } = require('../controllers/authentication');
const {loginValidatior , signUpValidatior} = require('../util/validation/authValidation'); 

router.post('/signup' , signUpValidatior , signUp);
router.post('/login' , loginValidatior , authLocal , login);

const {genertorOTP} = require('../controllers/otp');

router.get('/otp',genertorOTP);

module.exports = router ; 