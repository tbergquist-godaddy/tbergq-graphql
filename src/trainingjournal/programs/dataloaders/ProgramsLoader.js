// @flow

import Dataloader from 'dataloader';
import stringify from 'json-stable-stringify';

import fetch from '../../../common/services/Fetch';

export type ProgramsParams = {|
  +limit: number,
  +offset: number,
  +token: ?string,
|};

export type Programs = {|
  +count: number,
  +next: ?string,
  +previous: ?string,
  +results: {|
    +id: number,
    +name: string,
  |},
|};

const fetchPrograms = (params: $ReadOnlyArray<ProgramsParams>) =>
  Promise.all(
    params.map(param => {
      const token = param.token ?? '';
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

export default () =>
  new Dataloader<ProgramsParams, Programs>(fetchPrograms, {
    cacheKeyFn: stringify,
  });
