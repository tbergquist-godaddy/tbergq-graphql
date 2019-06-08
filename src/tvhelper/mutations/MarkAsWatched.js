// @flow

import { GraphQLID, GraphQLNonNull } from 'graphql';
import { fromGlobalId } from 'graphql-relay';

import type { GraphqlContextType } from '../../common/services/GraphqlContext';
import { addWatchedEpisode } from '../db/models/WatchedEpisodesModel';
import EpisodeWatched from '../types/EpisodeWatched';

type Args = {|
  +episodeId: string,
|};

export default {
  name: 'MarkAsWatched',
  type: EpisodeWatched,
  description: 'Mark an episode as watched',
  args: {
    episodeId: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (_: mixed, args: Args, { user }: GraphqlContextType) => {
    const { id: episodeId } = fromGlobalId(args.episodeId);

    await addWatchedEpisode({
      userId: user?.id,
      episodeId,
    });

    return { success: true, episode: { id: episodeId, isWatched: true } };
  },
};
