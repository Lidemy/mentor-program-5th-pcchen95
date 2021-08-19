const {
  Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Menu extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Menu.belongsTo(models.User)
    }
  }
  Menu.init({
    name: DataTypes.STRING,
    price: DataTypes.STRING,
    img: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Menu'
  })
  return Menu
}
