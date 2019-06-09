// @flow

import { Schema } from 'mongoose';

import { tvhelperConnection as mongoose } from '../../../common/db/MongoDB';

type WatchedEpisodeType = {|
  +userId: ?string,
  +episodeId: string,
|};

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

const throwNotLoggedInError = () => {
  throw Error('You must be logged in for this operation');
};
export const addWatchedEpisode = ({
  userId,
  episodeId,
}: WatchedEpisodeType) => {
  if (userId == null) {
    throwNotLoggedInError();
  }
  return WatchedEpisode.create(new WatchedEpisode({ userId, episodeId }));
};

export const deleteWatchedEpisode = ({
  userId,
  episodeId,
}: WatchedEpisodeType) => {
  if (userId == null) {
    throwNotLoggedInError();
  }
  return WatchedEpisode.deleteOne({
    userId,
    episodeId,
  });
};

export const findWatchedEpisodes = (
  episodeIds: $ReadOnlyArray<number>,
  userId: ?string,
) => {
  if (userId == null) {
    throwNotLoggedInError();
  }
  return WatchedEpisode.find({
    episodeId: { $in: episodeIds },
    userId,
  });
};
