// @flow

import Dataloader from 'dataloader';

import fetch from '../../common/services/Fetch';

export type Episode = {|
  +id: number,
  +name: string,
  +season: number,
  +number: number,
  +airdate: Date,
  +image: {| +medium: string, +original: string |},
  +summary: string,
  +isWatched?: boolean,
|};

const fetchEpisodes = async (serieIds: $ReadOnlyArray<string>) => {
  const responses: $ReadOnlyArray<Episode[]> = await Promise.all(
    serieIds.map(id => fetch(`http://api.tvmaze.com/shows/${id}/episodes`)),
  );
  return responses;
};

const TvShowEpisodeLoader = () => new Dataloader<string, Episode[]>(fetchEpisodes);

export default TvShowEpisodeLoader;
