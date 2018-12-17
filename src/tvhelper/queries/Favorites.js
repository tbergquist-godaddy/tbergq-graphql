// @flow

import { GraphQLList } from 'graphql';
import { fromGlobalId } from 'graphql-relay';

import TvShow from '../types/TvShow';
import type { GraphqlContextType } from '../../common/services/GraphqlContext';

export default {
  name: 'Favorites',
  type: GraphQLList(TvShow),
  description: 'Get your favorites',
  resolve: async (
    _: mixed,
    __: mixed,
    { user, dataLoader }: GraphqlContextType,
  ) => {
    if (user == null) {
      throw Error('You must be signed in to use this query');
    }
    const { id } = fromGlobalId(user.id);
    const savedFavorites = await dataLoader.tvhelper.favorites.load(id);
    const serieIds = savedFavorites.map(item => item.serieId.toString());
    // $FlowFixMe
    const favorites = await dataLoader.tvhelper.tvDetail.loadMany(serieIds);
    return favorites;
  },
};
