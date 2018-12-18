// @flow

import { GraphQLObjectType } from 'graphql';

import Login from './mutations/Login';
import tvHelperLogin from './tvhelper/mutations/Login';
import toggleFavorite from './tvhelper/mutations/ToggleFavorite';

export default new GraphQLObjectType({
  name: 'RootMutation',
  description: 'Root Mutation.',
  fields: {
    login: Login,
    toggleFavorite,
    tvHelperLogin,
  },
});
