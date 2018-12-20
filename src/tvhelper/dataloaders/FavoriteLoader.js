// @flow

import Dataloader from 'dataloader';
import stringify from 'json-stable-stringify';

import FavoritesModel from '../db/models/FavoritesModel';
import type { Favorites } from './FavoritesLoader';

export type FavoriteArgs = {|
  +userId: number,
  +serieId: number,
|};

const fetchFavorites = async (args: $ReadOnlyArray<FavoriteArgs>) => {
  const responses = await Promise.all(
    args.map(({ userId, serieId }) =>
      FavoritesModel.findOne({
        where: {
          userId,
          serieId,
        },
      }),
    ),
  );
  return responses;
};

export default () =>
  new Dataloader<FavoriteArgs, Favorites>(fetchFavorites, {
    cacheKeyFn: stringify,
  });
