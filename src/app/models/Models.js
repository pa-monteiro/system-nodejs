import Sequelize, { Model } from 'sequelize';

class Models extends Model {
  static init(sequelize) {
    super.init(
      {
        brand_id: Sequelize.INTEGER,
        name: Sequelize.STRING,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Brand, { foreignKey: 'brand_id', as: 'brand' });
  }
}

export default Models;
