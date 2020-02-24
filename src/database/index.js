import Sequelize from 'sequelize';
import dbConfig from '../config/database';

import User from '../app/models/User';
import Brand from '../app/models/Brand';
import Model from '../app/models/Models';
import Vehicle from '../app/models/Vehicle';

const models = [User, Brand, Model, Vehicle];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(dbConfig);
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
