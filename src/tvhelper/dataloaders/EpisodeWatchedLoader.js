// @flow

import Dataloader from 'dataloader';

import { findWatchedEpisodes } from '../db/models/WatchedEpisodesModel';
import type { LoggedInUser } from '../../common/services/GraphqlContext';

export type EpisodeWatched = {|
  +userId: number,
  +episodeId: number,
  +id: number,
|};

const loadWatchedEpisode = async (args: $ReadOnlyArray<number>, user: ?LoggedInUser) => {
  const watchedEpisodes = await findWatchedEpisodes(args, user?.id);

  return args.map(arg => watchedEpisodes.find(episode => episode.episodeId === arg));
};

const EpisodeWatchedLoader = (user: ?LoggedInUser) =>
  new Dataloader<number, EpisodeWatched[]>((args: $ReadOnlyArray<number>) =>
    loadWatchedEpisode(args, user),
  );

export default EpisodeWatchedLoader;
