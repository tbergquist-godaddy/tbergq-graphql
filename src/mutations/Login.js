// @flow

import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import { verify } from 'password-hash';
import jwt from 'jsonwebtoken';
import { toGlobalId } from 'graphql-relay';
import { config } from 'dotenv';

import type { GraphqlContextType } from '../common/services/GraphqlContext';

config();

const LoginType = new GraphQLObjectType({
  name: 'LoginType',
  fields: {
    token: {
      type: GraphQLString,
    },
  },
});

type Args = {|
  +username: string,
  +password: string,
|};

const { JWT_SECRET } = process.env;

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
  resolve: async (
    _: mixed,
    { username, password }: Args,
    { dataLoader }: GraphqlContextType,
  ) => {
    const user = await dataLoader.user.load(username);

    const isCorrect = verify(password, user.password);
    if (!isCorrect) {
      return {
        token: null,
      };
    }
    const token = jwt.sign(
      {
        id: toGlobalId('User', user.id),
        username: user.username,
      },
      JWT_SECRET,
      {
        expiresIn: '1y',
      },
    );
    return { token };
  },
};
