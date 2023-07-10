'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('offers',[{
        "startTime" : "2023-07-02",
        "endTime" : "2023-07-08",
        "discount_value" : 25 ,
        "productId" : 11,
        "price" : 3750 ,
        "createdAt" : new Date(),
        "updatedAt" : new Date()
    },{
      "startTime" : "2023-05-02",
      "endTime" : "2023-07-08",
      "discount_value" : 15 ,
      "productId" : 12,
      "price" : 1760 ,
      "createdAt" : new Date(),
      "updatedAt" : new Date()      
    },{
      "startTime" : "2023-05-02",
      "endTime" : "2023-06-08",
      "discount_value" : 30 ,
      "productId" : 11,
      "price" : 3500 ,
      "createdAt" : new Date(),
      "updatedAt" : new Date()
    },
    {
      "startTime" : "2023-07-02",
      "endTime" : "2023-07-08",
      "discount_value" : 5 ,
      "productId" : 13,
      "price" : 950 ,
      "createdAt" : new Date(),
      "updatedAt" : new Date()
    }
  ])
  },
  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('offers',null,{});
  }
};
