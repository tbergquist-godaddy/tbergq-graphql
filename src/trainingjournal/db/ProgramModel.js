// @flow

import { Schema } from 'mongoose';

import { trainingjournalConnection } from '../../common/db/MongoDB';
import type { LoggedInUser } from '../../common/services/GraphqlContext';
import verifyAccess from './verifyAccess';

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

const ProgramModel = trainingjournalConnection.model('program', ProgramSchema);

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

export const getProgram = (programId: string, user: ?LoggedInUser) => {
  if (verifyAccess(user)) {
    return ProgramModel.findOne({
      _id: programId,
      user: user?.id,
    });
  }
  return null;
};

export const userHasAccessToProgram = async (
  programId: string,
  user: ?LoggedInUser,
) => {
  if (verifyAccess(user)) {
    const program = await ProgramModel.findOne({
      programId,
      user: user?.id,
    }).lean();
    return program != null;
  }
  return false;
};

export default ProgramModel;
