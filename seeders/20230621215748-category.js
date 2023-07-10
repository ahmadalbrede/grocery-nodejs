'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('categories' ,[
      {
        "title" : "breakfast",
        "imageUrl" : "images\\1687293354717-image.jpg",
        "parent_id" : null ,
        "createdAt" : new Date(),
        "updatedAt" : new Date() 
      },
      {
        "title" : "milk",
        "imageUrl" : "images\\1687293354717-image.jpg",
        "parent_id" : 1 ,
        "createdAt" : new Date(),
        "updatedAt" : new Date() 
      },
      {
        "title" : "olives",
        "imageUrl" : "images\\1687293354717-image.jpg",
        "parent_id" : 1 ,
        "createdAt" : new Date(),
        "updatedAt" : new Date() 
      }
    ])
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('categories', null, {});  
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
