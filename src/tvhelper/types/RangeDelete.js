// @flow

import { GraphQLObjectType, GraphQLBoolean, GraphQLID } from 'graphql';

export default new GraphQLObjectType({
  name: 'RangeDelete',
  fields: {
    success: {
      type: GraphQLBoolean,
    },
    id: {
      type: GraphQLID,
    },
  },
});
