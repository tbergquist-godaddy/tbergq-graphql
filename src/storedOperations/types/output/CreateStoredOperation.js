// @flow

import { GraphQLObjectType, GraphQLList } from 'graphql';

import StoredOperation from './StoredOperation';

export default new GraphQLObjectType({
  name: 'CreateStoredOperation',
  fields: {
    createdOperations: {
      type: GraphQLList(StoredOperation),
    },
  },
});
