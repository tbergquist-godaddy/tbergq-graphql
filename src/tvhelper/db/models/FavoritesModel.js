// @flow

import sequelize from 'sequelize';

import db from '../index';
import User from './UserModel';

export default db.define('Favorites', {
  id: {
    primaryKey: true,
    type: sequelize.INTEGER,
    autoIncrement: true,
  },
  userId: {
    type: sequelize.INTEGER,
    unique: 'userSerieIndex',
    references: {
      model: User,
      key: 'id',
    },
  },
  serieId: {
    type: sequelize.INTEGER,
    unique: 'userSerieIndex',
  },
});
