// @flow

import { GraphQLObjectType, GraphQLBoolean } from 'graphql';

import TvShow from './TvShow';

export default new GraphQLObjectType({
  name: 'ToggleFavorite',
  fields: {
    success: {
      type: GraphQLBoolean,
    },
    tvShow: {
      type: TvShow,
    },
  },
});
