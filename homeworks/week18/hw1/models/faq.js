const {
  Model
} = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Faq extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Faq.belongsTo(models.User)
    }
  }
  Faq.init({
    order: DataTypes.INTEGER,
    question: DataTypes.STRING,
    answer: DataTypes.TEXT,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Faq'
  })
  return Faq
}
