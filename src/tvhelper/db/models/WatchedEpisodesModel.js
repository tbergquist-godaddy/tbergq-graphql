// @flow

import sequelize from 'sequelize';

import db from '../index';
import User from './UserModel';

export default db.define('WatchedEpisodes', {
  id: {
    primaryKey: true,
    type: sequelize.INTEGER,
    autoIncrement: true,
  },
  userId: {
    type: sequelize.INTEGER,
    unique: 'userEpisodeIndex',
    references: {
      model: User,
      key: 'id',
    },
  },
  episodeId: {
    type: sequelize.INTEGER,
    unique: 'userEpisodeIndex',
  },
});
