// @flow

import sequelize from 'sequelize';

import db from '../index';

const User = db.define('Users', {
  id: {
    primaryKey: true,
    type: sequelize.INTEGER,
    autoIncrement: true,
  },
  email: {
    type: sequelize.STRING,
    unique: true,
  },
  password: {
    type: sequelize.STRING,
  },
  username: {
    type: sequelize.STRING,
    unique: true,
  },
});

export default User;
