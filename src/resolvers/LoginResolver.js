// @flow

import { verify } from 'password-hash';
import jwt from 'jsonwebtoken';
import { toGlobalId } from 'graphql-relay';
import { config } from 'dotenv';

config();

type User = {|
  +id: string,
  +password: string,
  +username: string,
|};

const { JWT_SECRET } = process.env;

export default (user: User, password: string) => {
  const isCorrect = verify(password, user.password);
  if (!isCorrect) {
    return {
      token: null,
      success: false,
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
  return { token, success: true };
};
