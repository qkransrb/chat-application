"use strict";
const brypt = require("bcryptjs");

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    await queryInterface.bulkInsert("Users", [
      {
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        password: brypt.hashSync("1234", 10),
        gender: "male",
      },
      {
        firstName: "Sam",
        lastName: "Smith",
        email: "sam@example.com",
        password: brypt.hashSync("1234", 10),
        gender: "male",
      },
      {
        firstName: "Jane",
        lastName: "Doe",
        email: "jane@example.com",
        password: brypt.hashSync("1234", 10),
        gender: "female",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("Users", null, {});
  },
};
