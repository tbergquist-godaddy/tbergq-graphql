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
  return WeekModel.create({
    name,
    program: programId,
  });
};

export default WeekModel;
