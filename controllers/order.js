const Order = require('../models/Order');
const OrderCart = require('../models/OrderCart'); 
const Product = require('../models/Product');
const Offer = require('../models/Offer'); 
const { Op } = require("sequelize");

exports.createOrder = async(req , res , next )=>{
    try{
        const order = await Order.create({userId : req.user.id});
        return res.status(200).json({
            success : true ,
            orderData : order 
        }); 
    }
    catch(err){
        next(err);
    }
}
exports.addProductToCart = async(req , res , next )=>{
    try{
        let cart = await OrderCart.create({
            orderId : req.body.orderId ,
            productId : req.body.productId ,
            quantity : req.body.quantity
        });
        const date = new Date(Date.now()).toISOString() ; 
        const product = await Product.findByPk(req.body.productId , {
            include : [{
                model : Offer ,
                required : false ,
                where : {endTime : {[Op.gte] : date}}
            }]
        });
        await Product.increment({popular : 1} , {where : {id : product.id}});
        let totalPrice ;
        if(product.offers[0]){
            totalPrice = product.offers[0].price * cart.quantity ;
        }else{
            console.log('price product without offer',product.price);
            console.log('quantity is  : ' , cart.quantity);
            totalPrice = product.price * cart.quantity ;
        }
        console.log(totalPrice);
        cart.totalPrice = totalPrice ; 
        await cart.save(); 
        // const result =await OrderCart.update({totalPrice : totalPrice},{where : {id : cart.id}});
        return res.status(200).json({
            success : true ,
            data : cart
        });
    }
    catch(err){
        console.log(err);
        next(err);
    }
};
exports.getOrder = async(req , res , next )=> {
    try{
        const cart = await OrderCart.findAll({where : {orderId : req.query.orderId}});
        let totalAmount = 0 ; 
        cart.map(e => {
            totalAmount = totalAmount + e.totalPrice ; 
        });
        cart.push({totalAmount : totalAmount});
        return res.status(200).json({
            success : true ,
            data : cart 
        });
    }
    catch(err){
        next(err);
    }
}