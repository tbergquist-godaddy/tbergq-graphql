// @flow

import { GraphQLString, GraphQLNonNull } from 'graphql';

import fetch from '../../../common/services/Fetch';
import LoginType from '../../../types/LoginType';
import { signToken } from '../../../auth';

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
      let token;
      if (response.token != null) {
        token = signToken(
          {
            username,
            token: response.token,
          },
          'tronbe.pythonanywhere.com',
        );
      }

      return {
        success: token != null,
        token,
      };
    } catch {
      return {
        success: false,
        token: null,
      };
    }
  },
};
