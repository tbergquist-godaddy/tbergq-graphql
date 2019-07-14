// @flow

import Dataloader from 'dataloader';
import stringify from 'json-stable-stringify';

import { type Program, getPrograms } from '../../db/ProgramModel';

export type ProgramsParams = {|
  +limit: number,
  +offset: number,
  +user: ?Object, // TODO: Fix
|};

export type Programs = ?{|
  +count: number,
  +programs: $ReadOnlyArray<Program>,
|};

const fetchPrograms = (params: $ReadOnlyArray<ProgramsParams>) =>
  Promise.all(
    params.map(param => {
      return getPrograms(param.user, param.offset, param.limit);
    }),
  );

const ProgramsLoader = () =>
  new Dataloader<ProgramsParams, Programs | Error>(
    (params: $ReadOnlyArray<ProgramsParams>) => fetchPrograms(params),
    {
      cacheKeyFn: stringify,
    },
  );

export default ProgramsLoader;
