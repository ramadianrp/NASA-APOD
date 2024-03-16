'use strict';
const fs = require('fs')
const { hashPassword } = require('../helpers/bycrpt')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    let data = JSON.parse(fs.readFileSync("./data/user.json", "utf-8"));
    data.forEach((item) => {
      delete item.id;
      item.password = hashPassword(item.password)
      item.createdAt = new Date();
      item.updatedAt = new Date();
    });
    await queryInterface.bulkInsert('Users', data)
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users', null, {});
  }
};
