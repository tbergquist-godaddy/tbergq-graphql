// @flow

import { Schema } from 'mongoose';

import { trainingjournalConnection as mongoose } from '../../common/db/MongoDB';
import type { LoggedInUser } from '../../common/services/GraphqlContext';

export type Program = {|
  +id: string,
  +name: string,
  +date: Date,
|};

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

const verifyAccess = (user: ?LoggedInUser) => {
  return user?.app === 'trainingjournal';
};

export const createProgram = (name: string, user: ?LoggedInUser) => {
  if (verifyAccess(user)) {
    return ProgramModel.create({
      name,
      user: user?.id,
    });
  }
  return null;
};

export const getPrograms = async (
  user: ?LoggedInUser,
  skip: number,
  limit: number,
) => {
  if (verifyAccess(user)) {
    const aggregate = await ProgramModel.aggregate([
      {
        $match: { user: user?.id },
      },
      {
        $sort: { date: 1 },
      },
      {
        $facet: {
          programs: [
            { $skip: skip },
            { $limit: limit },
            { $project: { user: 0 } },
          ],
          count: [{ $count: 'total' }],
        },
      },
      {
        $unwind: '$count',
      },
      {
        $project: {
          count: '$count.total',
          programs: '$programs',
        },
      },
    ]).exec();

    return aggregate[0];
  }
  return null;
};

export default ProgramModel;
