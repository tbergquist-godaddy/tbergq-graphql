// @flow

import Dataloader from 'dataloader';
import stringify from 'json-stable-stringify';

import type { Day } from './ProgramLoader';
import fetch from '../../../common/services/Fetch';

const fetchDay = (ids: $ReadOnlyArray<string>, token: string) =>
  Promise.all(
    ids.map(id =>
      fetch(`https://tronbe.pythonanywhere.com/api/Program/days/${id}/`, {
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
    ),
  );

const DayLoader = (token: ?string) =>
  new Dataloader<string, Day>(
    (ids: $ReadOnlyArray<string>) => fetchDay(ids, token ?? ''),
    {
      cacheKeyFn: stringify,
    },
  );

export default DayLoader;
