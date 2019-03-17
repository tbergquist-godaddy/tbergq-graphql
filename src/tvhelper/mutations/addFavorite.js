// @flow

import { GraphQLID, GraphQLNonNull } from 'graphql';
import { fromGlobalId } from 'graphql-relay';

import type { GraphqlContextType } from '../../common/services/GraphqlContext';
import { createFavorite } from '../db/models/FavoritesModel';
import loggedInResolver from '../../resolvers/LoggedInResolver';
import AddFavorite from '../types/AddFavorite';

type Args = {|
  +serieId: string,
|};

export default {
  name: 'AddFavorite',
  type: AddFavorite,
  description: 'Add tv show to favorite list',
  args: {
    serieId: {
      type: GraphQLNonNull(GraphQLID),
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

    await createFavorite({
      userId,
      serieId,
    });
    const tvShow = await dataLoader.tvhelper.tvDetail.load(serieId);

    return {
      success: true,
      tvShow,
    };
  },
};
