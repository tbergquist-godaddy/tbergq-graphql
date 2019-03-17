// @flow

import { GraphQLObjectType, GraphQLBoolean } from 'graphql';

import TvShowNode from './TvShowNode';

export default new GraphQLObjectType({
  name: 'AddFavorite',
  fields: {
    success: {
      type: GraphQLBoolean,
    },
    tvShow: {
      type: TvShowNode,
    },
  },
});
