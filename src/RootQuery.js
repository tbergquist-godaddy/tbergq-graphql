// @flow

import { GraphQLObjectType } from 'graphql';

import Test from './queries/TestQuery';
import searchTvShow from './tvhelper/queries/SearchTvShow';

export default new GraphQLObjectType({
  name: 'RootQuery',
  description: 'Root Query',
  fields: {
    searchTvShow,
    test: Test,
  },
});
