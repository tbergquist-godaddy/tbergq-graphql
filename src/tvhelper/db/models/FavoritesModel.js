// @flow

import { Schema } from 'mongoose';

import mongoose from '../../../common/db/MongoDB';

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

export const createFavorite = (favorite: Object) =>
  Favorites.create(new Favorites(favorite));

export const deleteFavorite = ({ userId, serieId }: Object) =>
  Favorites.deleteOne({
    userId,
    serieId,
  });

export const findFavorites = (userId: string) => Favorites.find({ userId });

export default Favorites;
