// @flow

import { GraphQLObjectType, GraphQLBoolean } from 'graphql';

import { nodeInterface } from './node/node';

export default new GraphQLObjectType({
  name: 'MutationEdge',
  fields: {
    success: {
      type: GraphQLBoolean,
    },
    edge: {
      type: nodeInterface,
    },
  },
});
