import Sequelize, { Model } from 'sequelize';

class Vehicle extends Model {
  static init(sequelize) {
    super.init(
      {
        value: Sequelize.FLOAT,
        brand_id: Sequelize.INTEGER,
        model_id: Sequelize.INTEGER,
        year_model: Sequelize.INTEGER,
        fuel: Sequelize.STRING,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Brand, { foreignKey: 'brand_id', as: 'brand' });
    this.belongsTo(models.Models, { foreignKey: 'model_id', as: 'model' });
  }
}

export default Vehicle;
