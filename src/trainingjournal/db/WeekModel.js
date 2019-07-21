// @flow

import { Schema } from 'mongoose';

import { trainingjournalConnection as mongoose } from '../../common/db/MongoDB';
import type { LoggedInUser } from '../../common/services/GraphqlContext';
import { getProgram } from './ProgramModel';

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
  days: [
    {
      type: Schema.Types.ObjectId,
      ref: 'day',
    },
  ],
});

const WeekModel = mongoose.model('week', WeekSchema);

export const createWeek = async (
  name: string,
  programId: string,
  user: ?LoggedInUser,
) => {
  const program = await getProgram(programId, user);
  if (program == null) {
    // Verify that program belongs to user
    return null;
  }
  const week = await WeekModel.create({
    name,
    program: programId,
  });
  program.weeks.push(week);
  program.save();
  return week;
};

export const getWeeks = (ids: $ReadOnlyArray<string>) =>
  WeekModel.find({
    _id: { $in: ids },
  });

export default WeekModel;
