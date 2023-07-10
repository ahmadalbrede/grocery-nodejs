const Sequelize = require('sequelize');
const sequelize = require('../util/database'); 

const Product = sequelize.define('product',{
    id : {
        type : Sequelize.INTEGER,
        allowNull : false ,
        autoIncrement : true ,
        primaryKey : true 
    },
    title : Sequelize.STRING ,

    imageUrl : Sequelize.STRING ,

    description : Sequelize.TEXT('tiny') ,

    weight : Sequelize.FLOAT ,

    price : Sequelize.FLOAT ,

    popular : {
        type : Sequelize.INTEGER , 
        defaultValue : 0
    } 
});

module.exports = Product ; 