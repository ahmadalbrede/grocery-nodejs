const User = require('../models/User'); 
const bcrypt = require('bcryptjs'); 
const passport = require('passport');
const jwt = require('jsonwebtoken');
exports.signUp = (req , res , next )=>{
    const {name , mobileNumber , address , password , confirmPassword} = req.body ;
    User.findOne({where : {mobileNumber : mobileNumber}})
    .then(user => {
        if(user){
            return res.status(400).json('this mobile number is already exists');
        }
        if(password === confirmPassword){
        return bcrypt.hash(password , 12).then(hashPassword => {
            User.create({
                name : name ,
                mobileNumber : mobileNumber ,
                address : address ,
                password : hashPassword
            }).then(result => {
                const token = jwt.sign({id : result.id},'secretkey');
                return res.status(201).json({
                    userData : result ,
                    token : token 
                });
            }).catch(err => {
                throw err ; 
            });
        })}
        else{return res.status(400).json('Check the password')};
    }).catch(err => {
        console.log(err);
        throw err ; 
    });
};

exports.logout = (req , res , next )=> {
    return res.status(200).json('logged out successful'); 
};

exports.login = (req, res, next)=> {
    const token = jwt.sign({id : req.user.id},'secretkey');
    res.status(200).json({
        userData : req.user,
        token : token
    });
    return next();
}