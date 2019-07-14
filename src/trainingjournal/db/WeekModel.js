// @flow

import { Schema } from 'mongoose';

import { trainingjournalConnection as mongoose } from '../../common/db/MongoDB';

const WeekSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  program: {
    type: Schema.Types.ObjectId,
    ref: 'program',
    required: true,
  },
});

const WeekModel = mongoose.model('week', WeekSchema);

export default WeekModel;
