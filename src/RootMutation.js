// @flow

import { GraphQLObjectType } from 'graphql';

import Login from './mutations/Login';
import tvHelperLogin from './tvhelper/mutations/Login';
import toggleFavorite from './tvhelper/mutations/ToggleFavorite';
import markAsWatched from './tvhelper/mutations/MarkAsWatched';

export default new GraphQLObjectType({
  name: 'RootMutation',
  description: 'Root Mutation.',
  fields: {
    login: Login,
    markAsWatched,
    toggleFavorite,
    tvHelperLogin,
  },
});
