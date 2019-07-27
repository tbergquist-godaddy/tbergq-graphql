// @flow

import DataLoader from 'dataloader';

import WeekRepository from '../repositories/WeekRepository';

export type Week = {|
  +_id: string,
  +name: string,
  +program: string,
|};

const fetchWeeks = (ids: $ReadOnlyArray<string>, user: ?Object) => {
  const repository = new WeekRepository(user);
  return repository.getWeeks(ids);
};

export default function createWeeksLoader(user: ?Object) {
  return new DataLoader<string, Week>((ids: $ReadOnlyArray<string>) => fetchWeeks(ids, user));
}
