// @flow

import { GraphQLObjectType } from 'graphql';

import Login from './mutations/Login';
import tvHelperLogin from './tvhelper/mutations/Login';
import toggeFavorite from './tvhelper/mutations/ToggleFavorite';

export default new GraphQLObjectType({
  name: 'RootMutation',
  description: 'Root Mutation.',
  fields: {
    login: Login,
    toggeFavorite,
    tvHelperLogin,
  },
});
