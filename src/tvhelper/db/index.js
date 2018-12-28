// @flow

/* eslint-disable no-console */
import Sequelize from 'sequelize';
import { config } from 'dotenv';

config();

const { TV_HELPER_PASS } = process.env;

const sequelize = new Sequelize(
  'heroku_1545a01caaa1524',
  'b07b5834278de6',
  TV_HELPER_PASS,
  {
    host: 'eu-cdbr-west-01.cleardb.com',
    dialect: 'mysql',
    operatorsAliases: false,

    pool: {
      max: 90,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  },
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to sequelize');
  } catch (err) {
    console.log('failed to connect', err);
  }
})();

export default sequelize;
