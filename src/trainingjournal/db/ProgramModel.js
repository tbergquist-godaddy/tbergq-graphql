// @flow

import { Schema } from 'mongoose';

import { trainingjournalConnection as mongoose } from '../../common/db/MongoDB';
import type { LoggedInUser } from '../../common/services/GraphqlContext';

const ProgramSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    required: true,
  },
});

const ProgramModel = mongoose.model('program', ProgramSchema);

export const createProgram = (name: string, user: ?LoggedInUser) => {
  if (user?.app === 'trainingjournal') {
    return ProgramModel.create({
      name,
      user: user?.id,
    });
  }
  return null;
};

export default ProgramModel;
