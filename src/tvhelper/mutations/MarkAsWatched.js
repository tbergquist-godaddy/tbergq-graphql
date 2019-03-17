// @flow

import { GraphQLID, GraphQLNonNull } from 'graphql';
import { fromGlobalId } from 'graphql-relay';

import type { GraphqlContextType } from '../../common/services/GraphqlContext';
import { addWatchedEpisode } from '../db/models/WatchedEpisodesModel';
import loggedInResolver from '../../resolvers/LoggedInResolver';
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
    const verifiedUser = loggedInResolver(user);
    const { id: userId } = fromGlobalId(verifiedUser.id);
    const { id: episodeId } = fromGlobalId(args.episodeId);

    await addWatchedEpisode({
      userId,
      episodeId,
    });

    return { success: true, episode: { id: episodeId, isWatched: true } };
  },
};
