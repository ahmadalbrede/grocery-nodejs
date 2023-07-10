const Sequelize = require('sequelize') ; 

const sequelize = require('../util/database'); 

const User = sequelize.define('user' , {
    id : {
        type : Sequelize.INTEGER , 
        autoIncrement : true , 
        allowNull : false ,
        primaryKey : true 
    },
    name : {
        type : Sequelize.STRING , 
        allowNull : false ,
    },
    mobileNumber :{
        type : Sequelize.INTEGER ,
        unique : true ,
        allowNull: false,
    },
    password : Sequelize.STRING ,
    address : Sequelize.STRING
});

module.exports = User ;