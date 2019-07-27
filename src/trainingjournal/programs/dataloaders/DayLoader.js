// @flow

import Dataloader from 'dataloader';

import type { LoggedInUser } from '../../../resolvers/LoginResolver';
import DayRepository from '../repositories/DayRepository';

export type Day = {|
  +_id: string,
  +name: string,
|};

const fetchDay = (ids: $ReadOnlyArray<string>, user: ?LoggedInUser) => {
  const repository = new DayRepository(user);
  return repository.getDays(ids);
};

const DayLoader = (user: ?LoggedInUser) =>
  new Dataloader<string, Day>((ids: $ReadOnlyArray<string>) => fetchDay(ids, user));

export default DayLoader;
