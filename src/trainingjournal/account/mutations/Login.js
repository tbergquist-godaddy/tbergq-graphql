// @flow

import { GraphQLString, GraphQLNonNull } from 'graphql';

import loginResolver from '../../../resolvers/LoginResolver';
import LoginType from '../../../types/LoginType';
import { findOne } from '../../db/UserModel';

type Args = {|
  +username: string,
  +password: string,
|};

export default {
  type: LoginType,
  args: {
    username: {
      type: GraphQLNonNull(GraphQLString),
    },
    password: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (_: mixed, { username, password }: Args) => {
    try {
      const user = await findOne(username);
      return loginResolver(user, password, 'trainingjournal');
    } catch {
      return {
        success: false,
        token: null,
      };
    }
  },
};
