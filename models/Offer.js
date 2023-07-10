const Sequelize = require('sequelize'); 
const sequeize = require('../util/database');

const Offer = sequeize.define('offer',{
    id : {
        type : Sequelize.INTEGER,
        allowNull : false ,
        autoIncrement : true ,
        primaryKey : true 
    },
    startTime : Sequelize.DATE ,

    endTime : Sequelize.DATE,

    discount_value : Sequelize.INTEGER , 

    price : Sequelize.FLOAT 
});

module.exports = Offer ; 