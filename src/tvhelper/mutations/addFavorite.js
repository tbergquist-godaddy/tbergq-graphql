// @flow

import { GraphQLID, GraphQLNonNull } from 'graphql';
import { fromGlobalId } from 'graphql-relay';

import type { GraphqlContextType } from '../../common/services/GraphqlContext';
import { createFavorite } from '../db/models/FavoritesModel';
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
  resolve: async (_: mixed, args: Args, { user, dataLoader }: GraphqlContextType) => {
    const { id: serieId } = fromGlobalId(args.serieId);

    await createFavorite({
      userId: user?.id,
      serieId,
    });
    const tvShow = await dataLoader.tvhelper.tvDetail.load(serieId);

    return {
      success: true,
      tvShow,
    };
  },
};
