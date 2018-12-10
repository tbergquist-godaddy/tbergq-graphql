// @flow

import { GraphQLString, GraphQLObjectType } from 'graphql';

const TestType = new GraphQLObjectType({
  name: 'TestType',
  description: 'Test',
  fields: {
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
