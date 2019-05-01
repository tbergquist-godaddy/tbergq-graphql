// @flow

import { Schema } from 'mongoose';

import mongoose from '../../../common/db/MongoDB';

const WatchedEpisodesSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
  episodeId: {
    type: Number,
    required: true,
  },
});

WatchedEpisodesSchema.index({ userId: 1, episodeId: -1 }, { unique: true });

const WatchedEpisode = mongoose.model('watchedEpisodes', WatchedEpisodesSchema);

export const addWatchedEpisode = ({ userId, episodeId }: Object) =>
  WatchedEpisode.create(new WatchedEpisode({ userId, episodeId }));

export default WatchedEpisode;
