// @flow

import Dataloader from 'dataloader';
import stringify from 'json-stable-stringify';

import fetch from '../../../common/services/Fetch';

export type ProgramsParams = {|
  +limit: number,
  +offset: number,
|};

export type ProgramsItem = {|
  +id: number,
  +name: string,
|};

export type Programs = {|
  +count: number,
  +next: ?string,
  +previous: ?string,
  +results: ProgramsItem[],
|};

const fetchPrograms = (
  params: $ReadOnlyArray<ProgramsParams>,
  token?: string = '',
) =>
  Promise.all(
    params.map(param => {
      return fetch(
        `https://tronbe.pythonanywhere.com/api/Program/programs/?limit=${
          param.limit
        }&offset=${param.offset}`,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        },
      );
    }),
  );

const ProgramsLoader = (token?: string) =>
  new Dataloader<ProgramsParams, Programs>(
    (params: $ReadOnlyArray<ProgramsParams>) => fetchPrograms(params, token),
    {
      cacheKeyFn: stringify,
    },
  );

export default ProgramsLoader;
