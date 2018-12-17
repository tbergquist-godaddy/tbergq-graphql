// @flow

import { GraphQLObjectType } from 'graphql';

import Test from './queries/TestQuery';
import searchTvShow from './tvhelper/queries/SearchTvShow';
import tvShowDetail from './tvhelper/queries/TvShowDetail';

export default new GraphQLObjectType({
  name: 'RootQuery',
  description: 'Root Query',
  fields: {
    searchTvShow,
    tvShowDetail,
    test: Test,
  },
});
