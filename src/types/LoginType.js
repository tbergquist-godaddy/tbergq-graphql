// @flow

import { GraphQLObjectType, GraphQLString, GraphQLBoolean } from 'graphql';

export default new GraphQLObjectType({
  name: 'LoginType',
  fields: {
    token: {
      type: GraphQLString,
    },
    success: {
      type: GraphQLBoolean,
    },
  },
});
