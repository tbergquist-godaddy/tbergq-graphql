// @flow

import Dataloader from 'dataloader';
import stringify from 'json-stable-stringify';

import fetch from '../../../common/services/Fetch';
import type { BaseExercise } from '../../programs/dataloaders/ProgramLoader';

export type BaseExercisesArgs = {|
  +limit: number,
  +offset: number,
|};

export type BaseExerciseResponse = {|
  +count: number,
  +next: ?string,
  +previous: ?string,
  +results: BaseExercise[],
|};

const fetchBaseExercises = (
  args: $ReadOnlyArray<BaseExercisesArgs>,
  token: string,
) =>
  Promise.all(
    args.map(arg =>
      fetch(
        `https://tronbe.pythonanywhere.com/api/Program/baseExercises/?limit=${
          arg.limit
        }&offset=${arg.offset}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      ),
    ),
  );

export default function createBaseExerciseLoader(token: ?string) {
  return new Dataloader<BaseExercisesArgs, BaseExerciseResponse>(
    (args: $ReadOnlyArray<BaseExercisesArgs>) =>
      fetchBaseExercises(args, token ?? ''),
    {
      cacheKeyFn: stringify,
    },
  );
}
