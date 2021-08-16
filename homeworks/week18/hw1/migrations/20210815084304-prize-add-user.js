module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.addColumn('Prizes', 'userId', {
      type: Sequelize.INTEGER
    })
  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.removeColumn('userId')
  }
}
