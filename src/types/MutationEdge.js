// @flow

import { GraphQLObjectType, GraphQLBoolean } from 'graphql';

import { nodeInterface } from './node/node';

const MutationNode = new GraphQLObjectType({
  name: 'MutationNode',
  fields: {
    node: {
      type: nodeInterface,
    },
  },
});

export default new GraphQLObjectType({
  name: 'MutationEdge',
  fields: {
    success: {
      type: GraphQLBoolean,
    },
    edge: {
      type: MutationNode,
      resolve: parent => {
        return {
          node: parent.edge,
        };
      },
    },
  },
});
