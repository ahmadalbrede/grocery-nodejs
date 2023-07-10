const Offer = require('../models/Offer');
const Product = require('../models/Product');
const { Op } = require("sequelize");

exports.createOffer = async(req , res , next)=>{
    try{
        const reqData = req.body;
        const oldPrice = await Product.findByPk(reqData.productId);
        reqData.price = oldPrice.price - ((oldPrice.price *(reqData.discount_value))/100);
        const offer = await Offer.create(reqData);
        return res.status(201).json({
            success : true ,
            offer
        });
    }catch(err){
        console.log(err);
        next(err)
    }
}

exports.getoffer = (req , res , next )=>{
    const limits = [] ;
    const datenow = new Date(Date.now()).toISOString();  
    limits.push(req.query.min);
    limits.push(req.query.max);
    Offer.findAll({where : {
        discount_value : {
            [Op.between] : limits
        },
        endTime : {
            [Op.gte] : datenow
        }
    }, include :[{
        model : Product ,
        required : true 
    }] }).then(result => {
        return res.status(200).json({
            success : true ,
            data : result
        })
    }).catch(err => next(err));
}