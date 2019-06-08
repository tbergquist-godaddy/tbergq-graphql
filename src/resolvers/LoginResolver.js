// @flow

import { verify } from 'password-hash';
import { toGlobalId } from 'graphql-relay';

import { signToken } from '../auth';

type User = {|
  +id: string,
  +password: string,
  +username: string,
|};

const loginFailed = () => ({
  token: null,
  success: false,
});

const LoginResolver = (user: ?User, password: string) => {
  if (user == null) {
    return loginFailed();
  }
  const isCorrect = verify(password, user.password);
  if (!isCorrect) {
    return loginFailed();
  }
  const token = signToken({
    id: toGlobalId('User', user.id),
    username: user.username,
  });

  return { token, success: true };
};

export default LoginResolver;
