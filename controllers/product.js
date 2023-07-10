const { Model } = require('sequelize');
const Product = require('../models/Product');
const Category = require('../models/Category'); 
const Offer = require('../models/Offer');
const { Op } = require("sequelize");
const Rate = require('../models/Rate');
var _ = require('underscore');

exports.createProduct = async (req , res , next )=>{
    try{
        const data  = req.body ; 
        const image = req.file ;
        if(!image){
            const error = new Error('the image is required'); 
            error.statusCode = 422 ; 
            throw error ; 
        }
        data.imageUrl = image.path ;
        const productData = await Product.create(data);
        return res.status(200).json({
            success : true ,
            productData : productData 
        });
    }catch (err){
        next(err); 
    }
}
exports.getProducts = async(req , res , next)=>{
    try{
        const datenow = new Date(Date.now()).toISOString(); 
        // console.log(datenow); 
        // const {count , rate} = await Rate.findAndCountAll({where : {productId : }})
        const products = await Product.findAll({
            attributes : ['title' , 'description' , 'price', 'imageUrl' , 'weight' , 'id'], 
            include : [{
                model : Offer ,
                required: false, 
                attributes : ['price', 'discount_value'],
                where : {endTime : {[Op.gte]:datenow}}
        }]
    }) ;
    const result = products.map((product) => {
        if(product.offers[0]){
            product.price = product.offers[0].price;
            product.setDataValue('discount', product.offers[0].discount_value);// = product.offers[0].discount_value;
            // _.omit(product,'offers')
            // delete product.offers ; 
            // const { offers, ...newproduct } = product;
            // console.log(newproduct);
            // return newproduct;
            // console.log(product);
        }
        delete product.offers ;
        const { offers, ...newproduct } = product.toJSON()// or  product.get({ plain: true });
        return newproduct;
    });
    console.log(result);
    await Promise.all(result.map(async(e)=>{
        const {count , rows} = await Rate.findAndCountAll({where : {productId : e.id}});
        let x = 0 ;
        rows.map(e=>{
            x = x + e.value ;
        });
        const rate = x / count ;
        e.rate = rate;
        // e.setDataValue('rate', rate);
        return e;
    })).then(result => {
        return res.status(200).json(result)
    })
    // console.log(result);
    // return res.status(200).json(products);

    // await new Promise(async(resolve , reject)=> {
    //     await products.map(async(e) => {
    //             console.log(e.id); 
    //             const {count , rows} = await Rate.findAndCountAll({where : {productId : e.id}});
    //             console.log('rows is ',rows);
    //             console.log('count is : ',count);
    //             let x = 0 ; 
    //             rows.map(e=>{
    //                 x = x + e.value ;
    //             });
    //             const rate = x / count ; 
    //             console.log('the sum values is : ',rate);
                // e.rate = rate ;
                // // console.log(e);
    // });
    
//         resolve(products);
// }).then(result => {console.log('the the ht rhe',result[0].rate)}).catch(err => console.log(err));
// console.log('rate is is is ',result[0].rate);
// return res.status(200).json({
//             success : true ,
//             productDate : result[0].rate
//         });
    
    // (async()=>{for(let i = 0 ; i < products.lenght ; i++){
    //     console.log(e.id);
    //     const {count , rows} = await Rate.findAndCountAll({where : {productId : e.id}});
    //     console.log('count is : ',count);
    //     let x = 0 ; 
    //     rows.map(e=>{
    //         x = x + e.value ;
    //     });
    //     const rate = x / count ; 
    //     console.log('the sum values is : ',rate);
    //     e.rate = rate ; 
    // }})()


    // const promises = products.map(async(e) => {
    //     console.log(e.id); 
    //     const {count , rows} = await Rate.findAndCountAll({where : {productId : e.id}});
    //     console.log('rows is ',rows);
    //     console.log('count is : ',count);
    //     let x = 0 ; 
    //     rows.map(e=>{
    //         x = x + e.value ;
    //     });
    //     const rate = x / count ; 
    //     console.log('the sum values is : ',rate);
    //     e.rate = rate ; 
    //     console.log(e);
    //     return e ; 
    // })
    // await Promise.all(promises).then(result => {
    //     console.log(result[0].rate);
    //     return res.status(200).json({
    //         success : true ,
    //         productDate : result 
    //     });
        
    // });
    // console.log(results[0].rate);
    // console.log('.........................');
    // // console.log(products);
    //     return res.status(200).json({
    //         success : true ,
    //         productDate : results[0]  
    //     });
    }catch(err){
        console.log(err);
        next(err);
    }
};

exports.getProductsForCategory = async(req , res , next )=> {
    try{
        console.log(req.query.categoryId);
        const products = await Product.findAll({where : {categoryId : req.query.categoryId},
            attributes : ['title','id' , 'description','price','weight','imageUrl']
        });
        return res.status(200).json({
            success : true ,
            products
        });
    }catch(err){
        console.log(err);
        next(err);
    }
};

exports.getRate = async(req , res , next)=> {
    const rate = await Rate.findAll(); 
    return res.status(200).json(rate);
}

exports.getProduct = async(req , res , next )=> {
    try{
        const date = new Date(Date.now()).toISOString();
        let product = await Product.findByPk(req.query.productId , {
            include : [{
                model : Offer ,
                required : false ,
                where : {endTime :{ [Op .gte] : date} }
            }]
        });
        product = product.toJSON();
        if(product.offers[0]){
            product.discount = product.offers[0].discount_value;
            product.price = product.offers[0].price ; 
        }
        delete product.offers ;
        return res.status(200).json({
            success : true ,
            productData : product
        });
    }
    catch(err){
        next(err);
    }
}

exports.popularItem = async(req , res , next )=>{
    try{
        const products = await Product.findAll({order : [['popular' , 'DESC']]});
        return res.status(200).json({
            success : true ,
            popularProduct : products
        });
    }
    catch(err){
        next(err);
    }
}