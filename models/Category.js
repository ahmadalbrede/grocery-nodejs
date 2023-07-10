const Sequelize = require('sequelize'); 
const sequelize = require('../util/database');

const Category = sequelize.define('category' , {
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true ,
        allowNull : false ,
        primaryKey : true 
    },
    title : {
        type : Sequelize.STRING
    },
    imageUrl : {
        type : Sequelize.STRING,
    },
    parent_id : {
        type : Sequelize.INTEGER ,
        allownull : true ,
        defaultValue : null 
    }
});

module.exports = Category ; 