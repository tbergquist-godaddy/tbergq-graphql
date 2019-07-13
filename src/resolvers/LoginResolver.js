// @flow

import { verify } from 'password-hash';
import { toGlobalId } from 'graphql-relay';

import { signToken } from '../auth';

type User = {|
  +id: string,
  +password: string,
  +username: string,
|};

type Apps = 'tvhelper' | 'trainingjournal';

const loginFailed = () => ({
  token: null,
  success: false,
});

const LoginResolver = (user: ?User, password: string, app: Apps) => {
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
    app,
  });

  return { token, success: true };
};

export default LoginResolver;
