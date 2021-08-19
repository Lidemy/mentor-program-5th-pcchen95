module.exports = {
  up: async(queryInterface, Sequelize) => {
    await queryInterface.addColumn('Menus', 'userId', {
      type: Sequelize.INTEGER
    })
  },

  down: async(queryInterface, Sequelize) => {
    await queryInterface.removeColumn('userId')
  }
}
