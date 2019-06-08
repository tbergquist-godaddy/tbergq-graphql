// @flow

import { GraphQLID, GraphQLNonNull } from 'graphql';
import { fromGlobalId } from 'graphql-relay';

import type { GraphqlContextType } from '../../common/services/GraphqlContext';
import { deleteWatchedEpisode } from '../db/models/WatchedEpisodesModel';
import EpisodeWatched from '../types/EpisodeWatched';

type Args = {|
  +episodeId: string,
|};

export default {
  name: 'DeleteWatchedEpisode',
  type: EpisodeWatched,
  description: 'Delete an episode as watched',
  args: {
    episodeId: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (_: mixed, args: Args, { user }: GraphqlContextType) => {
    const { id: episodeId } = fromGlobalId(args.episodeId);

    await deleteWatchedEpisode({
      userId: user?.id,
      episodeId,
    });

    return { success: true, episode: { id: episodeId, isWatched: false } };
  },
};
