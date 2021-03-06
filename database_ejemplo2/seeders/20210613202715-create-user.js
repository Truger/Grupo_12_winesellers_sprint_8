'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
     Example:
      await queryInterface.bulkInsert('Users', [{
        firstName: 'Matias',
        lastName: 'Davila',
        email: 'matias@demo.com',
        password:'admin123',
        phone:'1132059010',
        photo:'',
        condition:1,
        createdAt: new Date(),
        updatedAt: new Date()
        },{
        firstName: 'John Doe',
        lastName: 'Doe',
        email: 'demo@demo.com',
        password:'admin123',
        cellphone:'1132059010',
        photo:'',
        condition:1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
   
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
