const fs = require('fs');
const Product = require('../../models/Product');
const db = require('../database');
const path = require('path'); 

const products = JSON.parse(fs.readFileSync('./product.json')); //path.join(__dirname , './product.json')

db.sync().then(result =>{
    console.log('connect to database');
}).catch(err=>console.log(err));
const insertData = async()=>{
    try{
        await Product.create(products);
        console.log('insert products data');
        process.exit();
    }
    catch(err){
        console.log(err);
    }
}

if(process.argv[2] === '-i'){
    insertData();
}