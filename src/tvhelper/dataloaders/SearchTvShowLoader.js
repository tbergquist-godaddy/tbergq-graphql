// @flow

import Dataloader from 'dataloader';
import fetch from '../../common/services/Fetch';

export type TvShow = {|
  +id: number,
  +name: string,
  +status: string,
  +premiered: Date,
  +rating: {| +average: number |},
  +summary: string,
|};

type ApiResponse = $ReadOnlyArray<{|
  +show: TvShow,
|}>;

const fetchTvShows = async (queries: $ReadOnlyArray<string>) => {
  const responses: ApiResponse[] = await Promise.all(
    queries.map(query =>
      fetch(`http://api.tvmaze.com/search/shows?q=${query}`),
    ),
  );

  return responses.map(response => response.map(item => item.show));
};

export default () =>
  new Dataloader<string, TvShow[]>((queries: $ReadOnlyArray<string>) =>
    fetchTvShows(queries),
  );
