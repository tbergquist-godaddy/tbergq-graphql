// @flow

import { GraphQLID, GraphQLNonNull } from 'graphql';
import { fromGlobalId } from 'graphql-relay';

import type { GraphqlContextType } from '../../common/services/GraphqlContext';
import WatchedEpisodes from '../db/models/WatchedEpisodesModel';
import loggedInResolver from '../../resolvers/LoggedInResolver';
import MarkAsWatched from '../types/MarkAsWatched';

type Args = {|
  +episodeId: string,
|};

export default {
  name: 'MarkAsWatched',
  type: MarkAsWatched,
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

    await WatchedEpisodes.create({
      userId,
      episodeId,
    });

    return { success: true };
  },
};