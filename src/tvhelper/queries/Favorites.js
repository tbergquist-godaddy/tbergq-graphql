// @flow

import {
  fromGlobalId,
  connectionFromArray,
  connectionArgs,
  type ConnectionArguments,
} from 'graphql-relay';

import TvShowConnection from '../types/TvShowConnection';
import type { GraphqlContextType } from '../../common/services/GraphqlContext';
import type { TvShow as TvShowType } from '../dataloaders/SearchTvShowLoader';

export default {
  name: 'Favorites',
  type: TvShowConnection,
  description: 'Get your favorites',
  args: {
    ...connectionArgs,
  },
  resolve: async (
    _: mixed,
    args: ConnectionArguments,
    { user, dataLoader }: GraphqlContextType,
  ) => {
    console.log(user);
    if (user == null) {
      throw Error('You must be signed in to use this query');
    }
    const { id } = fromGlobalId(user.id);
    const savedFavorites = await dataLoader.tvhelper.favorites.load(id);
    const serieIds = savedFavorites.map(item => item.serieId.toString());
    const favorites = await dataLoader.tvhelper.tvDetail.loadMany(serieIds);

    return connectionFromArray<TvShowType>(favorites, args);
  },
};
