// @flow

import Dataloader from 'dataloader';

import fetch from '../../common/services/Fetch';
import type { TvShow } from './SearchTvShowLoader';

const fetchTvDetail = async (ids: $ReadOnlyArray<string>) => {
  const responses = await Promise.all(
    ids.map(id =>
      fetch(
        `http://api.tvmaze.com/shows/${id}?embed[]=episodes&embed[]=nextepisode&embed[]=previousepisode&embed[]=cast`,
      ),
    ),
  );
  return responses.map(response => {
    const nextDate = response?._embedded?.nextepisode?.airdate ?? null;
    const previousDate = response?._embedded?.previousepisode?.airdate ?? null;
    return {
      ...response,
      ...(response._embedded
        ? {
            _embedded: {
              ...response._embedded,
              nextepisode: {
                ...response._embedded.nextepisode,
                airdate: nextDate !== null ? new Date(nextDate) : null,
              },
              previousepisode: {
                ...response._embedded.previousepisode,
                airdate: previousDate !== null ? new Date(previousDate) : null,
              },
            },
          }
        : {}),
    };
  });
};

const TvDetailLoader = () => new Dataloader<string, TvShow>(fetchTvDetail);

export default TvDetailLoader;
