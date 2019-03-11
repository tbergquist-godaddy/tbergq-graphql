// @flow

import { GraphQLID, GraphQLNonNull, GraphQLBoolean } from 'graphql';
import { fromGlobalId } from 'graphql-relay';

import type { GraphqlContextType } from '../../common/services/GraphqlContext';
import { createFavorite, deleteFavorite } from '../db/models/FavoritesModel';
import loggedInResolver from '../../resolvers/LoggedInResolver';
import GraphqlToggleFavorite from '../types/ToggleFavorite';

type Args = {|
  +serieId: string,
  +add: boolean,
|};

export default {
  name: 'ToggleFavorite',
  type: GraphqlToggleFavorite,
  description: 'Toggle tv show from favorite list',
  args: {
    serieId: {
      type: GraphQLNonNull(GraphQLID),
    },
    add: {
      type: GraphQLNonNull(GraphQLBoolean),
    },
  },
  resolve: async (
    _: mixed,
    args: Args,
    { user, dataLoader }: GraphqlContextType,
  ) => {
    const verifiedUser = loggedInResolver(user);
    const { id: userId } = fromGlobalId(verifiedUser.id);
    const { id: serieId } = fromGlobalId(args.serieId);
    if (args.add) {
      await createFavorite({
        userId,
        serieId,
      });
      const tvShow = await dataLoader.tvhelper.tvDetail.load(serieId);
      return {
        success: true,
        tvShow,
      };
    }
    await deleteFavorite({
      userId,
      serieId,
    });
    return { success: true, serieId: args.serieId };
  },
};
