// @flow

import Dataloader from 'dataloader';
import stringify from 'json-stable-stringify';

import FavoritesModel from '../db/models/FavoritesModel';
import type { Favorites } from './FavoritesLoader';

export type FavoriteArgs = {|
  +userId: string,
  +serieId: number,
|};

const fetchFavorites = async (args: $ReadOnlyArray<FavoriteArgs>) => {
  const responses = await Promise.all(
    args.map(({ userId, serieId }) =>
      FavoritesModel.findOne({
        userId,
        serieId,
      }),
    ),
  );
  return responses;
};

const FavoriteLoader = () =>
  new Dataloader<FavoriteArgs, Favorites>(fetchFavorites, {
    cacheKeyFn: stringify,
  });

export default FavoriteLoader;
