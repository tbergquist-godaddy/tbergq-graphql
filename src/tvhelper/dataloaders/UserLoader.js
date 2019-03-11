// @flow

import Dataloader from 'dataloader';

import { findOne } from '../db/models/UserModel';

export type UserType = {|
  +id: string,
  +username: string,
  +password: string,
|};

const fetchUser = async (usernames: $ReadOnlyArray<string>) => {
  const users = await Promise.all(usernames.map(username => findOne(username)));
  return users.map(user => {
    if (user == null) {
      return null;
    }
    return {
      id: user._id,
      username: user.username,
      password: user.password,
    };
  });
};

export default () => new Dataloader<string, ?UserType>(fetchUser);
