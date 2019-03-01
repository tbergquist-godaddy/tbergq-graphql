// @flow

import {
  GraphQLString,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLBoolean,
} from 'graphql';
import { generate } from 'password-hash';

import UserModel from '../db/models/UserModel';

type Args = {|
  +username: string,
  +password: string,
  +email: string,
|};

const CreateUserType = new GraphQLObjectType({
  name: 'CreateUserMutation',
  fields: {
    success: {
      type: GraphQLBoolean,
    },
  },
});

export default {
  type: CreateUserType,
  args: {
    username: {
      type: GraphQLNonNull(GraphQLString),
    },
    password: {
      type: GraphQLNonNull(GraphQLString),
    },
    email: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (_: mixed, { username, password, email }: Args) => {
    await UserModel.create({
      username,
      password: generate(password),
      email,
    });

    return { success: true };
  },
};
