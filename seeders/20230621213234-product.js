'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('products', [{
      "title" : "stuffed olives",
        "imageUrl" : "images\\1687293354717-image.jpg",
        "description" : "stuffed olives in vagtab",
        "weight" : 200 ,
        "price" : 5000 ,
        "popular" : 9,
        "categoryId" : 3,
        "createdAt": new Date(),
        "updatedAt": new Date()
    },
    {
        "title" : "Cow's milk",
        "imageUrl" : "images\\1687293354717-image.jpg",
        "description" : "Natural cow's milk",
        "weight" : 1 ,
        "price" : 2000 ,
        "popular" : 6 ,
        "categoryId" : 2,
        "createdAt": new Date(),
        "updatedAt": new Date()
    },
    {
        "title" : "green olives",
        "imageUrl" : "images\\1687293354717-image.jpg",
        "description" : "green olives in vagtab",
        "weight" : 200 ,
        "price" : 1000 ,
        "popular" : 9,
        "categoryId" : 3,
        "createdAt": new Date(),
        "updatedAt": new Date()
    },
    {
        "title" : "black olives",
        "imageUrl" : "images\\1687293354717-image.jpg",
        "description" : "black olives in vagtab",
        "weight" : 200 ,
        "price" : 3000 ,
        "popular" : 5,
        "categoryId" : 3,
        "createdAt": new Date(),
        "updatedAt": new Date()
    },
    {
        "title" : "Sheep's milk",
        "imageUrl" : "images\\1687293354717-image.jpg",
        "description" : "Natural sheep's milk",
        "weight" : 2 ,
        "price" : 4000 ,
        "popular" : 7,
        "categoryId" : 2,
        "createdAt": new Date(),
        "updatedAt": new Date()
    }]);
    
    
    
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
    
    return queryInterface.bulkDelete('products', null, {});    
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
