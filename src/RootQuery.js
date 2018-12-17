// @flow

import { GraphQLObjectType } from 'graphql';

import Test from './queries/TestQuery';
import searchTvShow from './tvhelper/queries/SearchTvShow';
import tvShowDetail from './tvhelper/queries/TvShowDetail';
import favorites from './tvhelper/queries/Favorites';

export default new GraphQLObjectType({
  name: 'RootQuery',
  description: 'Root Query',
  fields: {
    favorites,
    searchTvShow,
    tvShowDetail,
    test: Test,
  },
});
