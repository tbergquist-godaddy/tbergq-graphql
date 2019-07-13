// @flow

import { GraphQLObjectType } from 'graphql';

import tvHelperLogin from './tvhelper/mutations/Login';
import toggleFavorite from './tvhelper/mutations/ToggleFavorite';
import markAsWatched from './tvhelper/mutations/MarkAsWatched';
import deleteWatchedEpisode from './tvhelper/mutations/DeleteWatchedEpisode';
import createUser from './tvhelper/mutations/CreateUser';
import addFavorite from './tvhelper/mutations/addFavorite';
import deleteFavorite from './tvhelper/mutations/deleteFavorite';
import trainingJournalLogin from './trainingjournal/account/mutations/Login';
import createExercise from './trainingjournal/programs/mutations/CreateExercise';
import createdStoredOperations from './storedOperations/mutation/createStoredOperations';
import createTrainingjournalUser from './trainingjournal/account/mutations/CreateUser';

export default new GraphQLObjectType({
  name: 'RootMutation',
  description: 'Root Mutation.',
  fields: {
    addFavorite,
    createExercise,
    createdStoredOperations,
    createTrainingjournalUser,
    createUser,
    deleteFavorite,
    deleteWatchedEpisode,
    markAsWatched,
    toggleFavorite,
    trainingJournalLogin,
    tvHelperLogin,
  },
});
