// @flow

import Dataloader from 'dataloader';
import fetch from '../../common/services/Fetch';

import type { Episode } from './TvShowEpisodesLoader';

export type Person = {|
  +id: string,
  +name: string,
  +image: {| +original: string, +medium: string |},
|};

export type Cast = {|
  +person: Person,
  +character: Person,
|};

export type TvShow = {|
  +id: number,
  +name: string,
  +status: string,
  +premiered: Date,
  +rating: {| +average: number |},
  +summary: string,
  +_embedded?: {|
    +episodes?: ?$ReadOnlyArray<Episode>,
    +nextepisode?: ?Episode,
    +previousepisode?: ?Episode,
    +cast?: ?$ReadOnlyArray<Cast>,
  |},
|};

type ApiResponse = $ReadOnlyArray<{|
  +show: TvShow,
|}>;

const fetchTvShows = async (queries: $ReadOnlyArray<string>) => {
  const responses: ApiResponse[] = await Promise.all(
    queries.map(query =>
      fetch(
        `http://api.tvmaze.com/search/shows?q=${query}&embed[]=nextepisode&embed[]=previousepisode`,
      ),
    ),
  );

  return responses.map(response => response.map(item => item.show));
};

export default () =>
  new Dataloader<string, TvShow[]>((queries: $ReadOnlyArray<string>) =>
    fetchTvShows(queries),
  );
