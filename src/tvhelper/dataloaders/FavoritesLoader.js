// @flow

import Dataloader from 'dataloader';

import FavoritesModel from '../db/models/FavoritesModel';

export type Favorites = {|
  +id: number,
  +userId: number,
  +serieId: number,
|};

const fetchFavorites = async (userIds: $ReadOnlyArray<string>) => {
  const responses = await Promise.all(
    userIds.map(userId =>
      FavoritesModel.findAll({
        where: {
          userId,
        },
      }),
    ),
  );
  return responses;
};

export default () => new Dataloader<string, Favorites[]>(fetchFavorites);
