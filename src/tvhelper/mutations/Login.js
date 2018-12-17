// @flow

import { GraphQLString, GraphQLNonNull } from 'graphql';

import type { GraphqlContextType } from '../../common/services/GraphqlContext';
import LoginType from '../../types/LoginType';
import loginResolver from '../../resolvers/LoginResolver';

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
  resolve: async (
    _: mixed,
    { username, password }: Args,
    { dataLoader }: GraphqlContextType,
  ) => {
    const user = await dataLoader.tvhelper.user.load(username);

    return loginResolver(user, password);
  },
};
