// @flow

import { GraphQLID, GraphQLNonNull } from 'graphql';
import { fromGlobalId } from 'graphql-relay';

import type { GraphqlContextType } from '../../common/services/GraphqlContext';
import { deleteFavorite } from '../db/models/FavoritesModel';
import loggedInResolver from '../../resolvers/LoggedInResolver';
import RangeDelete from '../types/RangeDelete';

type Args = {|
  +serieId: string,
|};

export default {
  name: 'DeleteFavorite',
  type: RangeDelete,
  description: 'Remove tv show from favorite list',
  args: {
    serieId: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (_: mixed, args: Args, { user }: GraphqlContextType) => {
    const verifiedUser = loggedInResolver(user);
    const { id: userId } = fromGlobalId(verifiedUser.id);
    const { id: serieId } = fromGlobalId(args.serieId);

    await deleteFavorite({
      userId,
      serieId,
    });

    return {
      success: true,
      id: args.serieId,
    };
  },
};
