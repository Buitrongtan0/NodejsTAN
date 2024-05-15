'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up: async(queryInterface, Sequelize)=> {
    return queryInterface.bulkInsert('user', [{
      email: 'admin@gmail.com',
      password: '123456',
      lastName: 'buitrong',
      address: 'tan',
      phonenumber: '0388433654',
      gender: 1,
      typeRole: 'role',
      keyRole: 'R1',
      createdAt: new Date(),
      updatedAt: new Date()
    }])
  },  

   down: async (queryInterface, Sequelize)=> {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
