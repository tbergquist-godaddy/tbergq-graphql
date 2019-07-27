// @flow

import { GraphQLString, GraphQLNonNull } from 'graphql';
import { generate } from 'password-hash';

import { createUser } from '../../db/UserModel';
import CreateUserType from '../../../types/CreateUserType';

type Args = {|
  +username: string,
  +password: string,
  +email: string,
|};

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
    await createUser({
      username,
      password: generate(password),
      email,
    });

    return { success: true };
  },
};
