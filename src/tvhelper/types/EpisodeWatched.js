// @flow

import { GraphQLObjectType, GraphQLBoolean, GraphQLID } from 'graphql';

export default new GraphQLObjectType({
  name: 'EpisodeWatched',
  fields: {
    success: {
      type: GraphQLBoolean,
    },
    id: {
      type: GraphQLID,
    },
  },
});
