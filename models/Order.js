const Sequelize = require('sequelize'); 
const sequelize = require('../util/database');
const Product = require('./Product');
const OrderCart = require('./OrderCart');
const User = require('./User');
const Order = sequelize.define('order',{
    id : {
        type : Sequelize.INTEGER ,
        allowNull : false ,
        autoIncrement : true ,
        primaryKey : true 
    },
});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product , {through : OrderCart});
Product.belongsToMany(Order , {through : OrderCart});  

module.exports = Order ; 
