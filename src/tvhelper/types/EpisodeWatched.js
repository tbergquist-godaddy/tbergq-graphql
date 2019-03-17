// @flow

import { GraphQLObjectType, GraphQLBoolean } from 'graphql';

import Episode from './Episode';

export default new GraphQLObjectType({
  name: 'EpisodeWatched',
  fields: {
    success: {
      type: GraphQLBoolean,
    },
    episode: {
      type: Episode,
    },
  },
});
