// @flow

import { GraphQLString, GraphQLNonNull } from 'graphql';

import fetch from '../../common/services/Fetch';
import LoginType from '../../types/LoginType';

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
    const response = await fetch(
      'https://tronbe.pythonanywhere.com/api/Account/auth/',
      {
        method: 'POST',
        body: JSON.stringify({
          username,
          password,
        }),
      },
    );

    return {
      success: response.token != null,
      token: response.token,
    };
  },
};
