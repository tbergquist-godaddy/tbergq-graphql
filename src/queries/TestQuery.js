// @flow

import { GraphQLString, GraphQLObjectType, GraphQLID } from 'graphql';
import { toGlobalId } from 'graphql-relay';

const TestType = new GraphQLObjectType({
  name: 'TestType',
  description: 'Test',
  fields: {
    id: {
      type: GraphQLID,
      resolve: () => toGlobalId('test', '1'),
    },
    test: {
      type: GraphQLString,
      resolve: (ancestor: string) => ancestor,
    },
  },
});

export default {
  type: TestType,
  description: 'Test',

  resolve: () => 'test',
};
