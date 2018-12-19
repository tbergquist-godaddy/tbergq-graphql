// @flow

import Dataloader from 'dataloader';

import fetch from '../../common/services/Fetch';
import type { TvShow } from './SearchTvShowLoader';

const fetchTvDetail = async (ids: $ReadOnlyArray<string>) => {
  const responses = await Promise.all(
    ids.map(id =>
      fetch(
        `http://api.tvmaze.com/shows/${id}?embed[]=episodes&embed[]=nextepisode&embed[]=previousepisode`,
      ),
    ),
  );
  return responses;
};

export default () => new Dataloader<string, TvShow>(fetchTvDetail);
