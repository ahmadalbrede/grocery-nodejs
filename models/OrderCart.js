const Sequelize = require('sequelize');
const sequelize = require('../util/database'); 
const User = require('./User');
const Order = require('./Order');

const OrderCart = sequelize.define('orderCart',{
    id : {
        type : Sequelize.INTEGER , 
        allowNull : false ,
        autoIncrement : true ,
        primaryKey : true 
    },
    quantity : Sequelize.INTEGER,

    totalPrice: Sequelize.FLOAT 
});

module.exports = OrderCart ;