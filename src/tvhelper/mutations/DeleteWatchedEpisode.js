// @flow

import { GraphQLID, GraphQLNonNull } from 'graphql';
import { fromGlobalId } from 'graphql-relay';

import type { GraphqlContextType } from '../../common/services/GraphqlContext';
import WatchedEpisode from '../db/models/WatchedEpisodesModel';
import loggedInResolver from '../../resolvers/LoggedInResolver';
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
    const verifiedUser = loggedInResolver(user);
    const { id: userId } = fromGlobalId(verifiedUser.id);
    const { id: episodeId } = fromGlobalId(args.episodeId);

    await WatchedEpisode.deleteOne({
      userId,
      episodeId,
    });

    return { success: true, id: args.episodeId };
  },
};
