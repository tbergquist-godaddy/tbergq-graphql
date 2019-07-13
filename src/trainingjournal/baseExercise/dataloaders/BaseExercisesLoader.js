// @flow

import Dataloader from 'dataloader';
import stringify from 'json-stable-stringify';

import { getBaseExercises } from '../../db/BaseExerciseModel';

export type BaseExercisesArgs = {|
  +limit: number,
  +offset: number,
  +user: ?Object,
|};

export type BaseExerciseType = {|
  +_id: string,
  +videoLink?: string,
  +description?: string,
  +muscleGroup: string,
|};

export type BaseExerciseResponse = ?{|
  +count: number,
  +baseExercises: $ReadOnlyArray<BaseExerciseType>,
|};

const fetchBaseExercises = (args: $ReadOnlyArray<BaseExercisesArgs>) =>
  Promise.all(
    args.map(arg => {
      return getBaseExercises(arg.user, arg.offset, arg.limit);
    }),
  );

export default function createBaseExerciseLoader() {
  return new Dataloader<BaseExercisesArgs, BaseExerciseResponse>(
    (args: $ReadOnlyArray<BaseExercisesArgs>) => fetchBaseExercises(args),
    {
      cacheKeyFn: stringify,
    },
  );
}
