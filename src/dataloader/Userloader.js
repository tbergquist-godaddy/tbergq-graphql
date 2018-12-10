// @flow

import DataLoader from 'dataloader';

import { findOne, type UserType } from '../common/db/UserModel';

const batchLoad = async (
  usernames: $ReadOnlyArray<string>,
): Promise<$ReadOnlyArray<UserType>> => {
  const promises = Promise.all(
    usernames.map(async username => {
      const user = await findOne(username);

      return user;
    }),
  );
  return promises;
};

export default new DataLoader<string, UserType>(
  (usernames: $ReadOnlyArray<string>) => batchLoad(usernames),
);
