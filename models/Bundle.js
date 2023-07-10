const Sequelize = require('sequelize'); 
const sequelize = require('../util/database');

const Bundle = sequelize.define('bundle',{
    id : {
        type : Sequelize.INTEGER,
        allowNull : false ,
        autoIncrement : true ,
        primaryKey : true 
    },
})