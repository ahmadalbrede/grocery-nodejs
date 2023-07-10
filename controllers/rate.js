const Rate = require('../models/Rate');

exports.addRate = async(req , res , next )=>{
        Rate.create({
            value : req.body.value,
            userId : req.user.id,
            productId : req.body.productId
        }).then(rate => {
            return res.status(201).json({
                success : true ,
                rateData : rate 
            })
        }).catch(err => {
            next(err);
        });
};