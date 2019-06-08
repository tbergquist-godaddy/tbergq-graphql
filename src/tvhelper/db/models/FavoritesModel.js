// @flow

import { Schema } from 'mongoose';

import mongoose from '../../../common/db/MongoDB';

type Favorite = {|
  +userId: ?string,
  +serieId: string,
|};

const FavoritesSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
  serieId: {
    type: Number,
  },
});

FavoritesSchema.index({ userId: 1, serieId: -1 }, { unique: true });

const Favorites = mongoose.model('favorites', FavoritesSchema);

export const createFavorite = (favorite: Favorite) => {
  if (favorite.userId == null) {
    throw Error('You must be logged in to add favorite.');
  }
  return Favorites.create(new Favorites(favorite));
};

export const deleteFavorite = ({ userId, serieId }: Favorite) => {
  if (userId == null) {
    throw Error('You must be logged in to delete favorite.');
  }
  return Favorites.deleteOne({
    userId,
    serieId,
  });
};

export const findFavorites = (userId?: string) => {
  if (userId == null) {
    throw Error('You must be logged in to get favorites');
  }
  return Favorites.find({ userId });
};

export default Favorites;
