// @flow

import { GraphQLObjectType, GraphQLBoolean } from 'graphql';

export default new GraphQLObjectType({
  name: 'MarkAsWatched',
  fields: {
    success: {
      type: GraphQLBoolean,
    },
  },
});
