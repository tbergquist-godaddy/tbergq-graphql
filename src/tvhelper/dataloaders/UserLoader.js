// @flow

import Dataloader from 'dataloader';

import User from '../db/models/UserModel';

export type UserType = {|
  +id: string,
  +username: string,
  +password: string,
|};

const fetchUser = async (usernames: $ReadOnlyArray<string>) => {
  const users = await Promise.all(
    usernames.map(username => User.findOne({ where: { username } })),
  );
  return users.map(user => {
    if (user == null) {
      return null;
    }
    return {
      id: user.id.toString(),
      username: user.username,
      password: user.password,
    };
  });
};

export default () => new Dataloader<string, ?UserType>(fetchUser);
