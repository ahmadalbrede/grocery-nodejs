const Sequelize = require('sequelize'); 
const sequelize = require('../util/database'); 
const User = require('./User');
const Product = require('./Product'); 

const Rate = sequelize.define('rate' , {
    id : {
        type : Sequelize.INTEGER  ,
        allowNull : false ,
        autoIncrement : true ,
        primaryKey : true 
    },
    value : {
        type : Sequelize.FLOAT ,
        allowNull : false ,
    }
})
User.hasMany(Rate);
Rate.belongsTo(User);
Product.hasMany(Rate);
Rate.belongsTo(Product);

module.exports = Rate ; 