// @flow

import Dataloader from 'dataloader';
import stringify from 'json-stable-stringify';

import fetch from '../../../common/services/Fetch';

type MuscleGroup = {|
  +id: number,
  +name: string,
|};

export type BaseExercise = {|
  +id: number,
  +name: string,
  +youtube_link: string,
  +description: string,
  +muscle_group: MuscleGroup,
|};

export type Exercise = {|
  +id: number,
  +set: string,
  +reps: string,
  +description: string,
  +break_time: string,
  +base_exercise: BaseExercise,
|};

export type Day = {|
  +id: number,
  +name: string,
  +week: number,
  +exercises: Exercise[],
|};

export type Week = {|
  +id: number,
  +name: string,
  +program: number,
  +days: Day[],
|};

export type Program = {|
  +id: number,
  +name: string,
  +date: Date,
  +user: number,
  +weeks: Week[],
|};

const fetchPrograms = (ids: $ReadOnlyArray<string>, token: string) =>
  Promise.all(
    ids.map(id =>
      fetch(`https://tronbe.pythonanywhere.com/api/Program/programs/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
    ),
  );

export default (token: ?string) =>
  new Dataloader<string, Program>(
    (ids: $ReadOnlyArray<string>) => fetchPrograms(ids, token ?? ''),
    {
      cacheKeyFn: stringify,
    },
  );
