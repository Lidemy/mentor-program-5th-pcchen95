module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.addColumn('Faqs', 'userId', {
      type: Sequelize.INTEGER
    })
  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.removeColumn('userId')
  }
}
