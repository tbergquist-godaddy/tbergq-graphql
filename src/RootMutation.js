// @flow

import { GraphQLObjectType } from 'graphql';

import tvHelperLogin from './tvhelper/mutations/Login';
import toggleFavorite from './tvhelper/mutations/ToggleFavorite';
import markAsWatched from './tvhelper/mutations/MarkAsWatched';
import deleteWatchedEpisode from './tvhelper/mutations/DeleteWatchedEpisode';
import createUser from './tvhelper/mutations/CreateUser';
import addFavorite from './tvhelper/mutations/addFavorite';
import deleteFavorite from './tvhelper/mutations/deleteFavorite';
import trainingJournalLogin from './trainingjournal/mutations/Login';

export default new GraphQLObjectType({
  name: 'RootMutation',
  description: 'Root Mutation.',
  fields: {
    addFavorite,
    createUser,
    deleteFavorite,
    deleteWatchedEpisode,
    markAsWatched,
    toggleFavorite,
    trainingJournalLogin,
    tvHelperLogin,
  },
});
