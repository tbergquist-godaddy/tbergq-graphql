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

const loginFailed = () => ({
  token: null,
  success: false,
});

export default (user: ?User, password: string) => {
  if (user == null) {
    return loginFailed();
  }
  const isCorrect = verify(password, user.password);
  if (!isCorrect) {
    return loginFailed();
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
