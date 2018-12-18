// @flow

import { GraphQLObjectType, GraphQLBoolean, GraphQLID } from 'graphql';

import TvShow from './TvShow';

const TvShowNode = new GraphQLObjectType({
  name: 'TvShowNode',
  fields: {
    node: {
      type: TvShow,
      resolve: (ancestor: Object) => ancestor,
    },
  },
});

export default new GraphQLObjectType({
  name: 'ToggleFavorite',
  fields: {
    success: {
      type: GraphQLBoolean,
    },
    serieId: {
      type: GraphQLID,
    },
    tvShow: {
      type: TvShowNode,
    },
  },
});
