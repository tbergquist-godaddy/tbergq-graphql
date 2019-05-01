// @flow

import Dataloader from 'dataloader';
import { fromGlobalId } from 'graphql-relay';

import WatchedEpisode from '../db/models/WatchedEpisodesModel';
import type { LoggedInUser } from '../../common/services/GraphqlContext';

export type EpisodeWatched = {|
  +userId: number,
  +episodeId: number,
  +id: number,
|};

const loadWatchedEpisode = async (
  args: $ReadOnlyArray<number>,
  user: ?LoggedInUser,
) => {
  const userId = user?.id ?? '';

  const watchedEpisodes = await WatchedEpisode.find({
    episodeId: { $in: args },
    userId: fromGlobalId(userId).id,
  });
  return args.map(arg =>
    watchedEpisodes.find(episode => episode.episodeId === arg),
  );
};

const EpisodeWatchedLoader = (user: ?LoggedInUser) =>
  new Dataloader<number, EpisodeWatched[]>((args: $ReadOnlyArray<number>) =>
    loadWatchedEpisode(args, user),
  );

export default EpisodeWatchedLoader;
