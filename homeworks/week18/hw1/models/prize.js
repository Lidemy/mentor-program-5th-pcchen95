const {
  Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Prize extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Prize.belongsTo(models.User)
    }
  }
  Prize.init({
    prize: DataTypes.STRING,
    content: DataTypes.TEXT,
    probability: DataTypes.FLOAT,
    imgUrl: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Prize'
  })
  return Prize
}
