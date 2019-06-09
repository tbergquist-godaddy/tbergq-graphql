// @flow

import { GraphQLInputObjectType, GraphQLNonNull, GraphQLString } from 'graphql';

export default new GraphQLInputObjectType({
  name: 'StoredOperationInput',
  fields: {
    operationId: {
      type: GraphQLNonNull(GraphQLString),
    },
    text: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
});
