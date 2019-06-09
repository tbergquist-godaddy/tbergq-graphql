// @flow

import { GraphQLObjectType, GraphQLString } from 'graphql';

export default new GraphQLObjectType({
  name: 'StoredOperation',
  fields: {
    operationId: {
      type: GraphQLString,
    },
    text: {
      type: GraphQLString,
    },
  },
});
