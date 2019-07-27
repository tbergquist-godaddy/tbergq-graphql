// @flow

import { GraphQLBoolean, GraphQLObjectType } from 'graphql';

const CreateUserType = new GraphQLObjectType({
  name: 'CreateUserMutation',
  fields: {
    success: {
      type: GraphQLBoolean,
    },
  },
});

export default CreateUserType;
