// @flow

/* eslint-disable no-console */
import Sequelize from 'sequelize';
import { config } from 'dotenv';

config();

const sequelize = new Sequelize(process.env.TV_HELPER_DB);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connected to sequelize');
  } catch (err) {
    console.log('failed to connect', err);
  }
})();

export default sequelize;
