// @flow

import { trainingjournalConnection } from '../../../common/db/MongoDB';
import TrainingJournalRepository from './TrainingJournalRepository';
import programModel from '../../db/ProgramModel';
import WeekModel from '../../db/WeekModel';
import type { LoggedInUser } from '../../../resolvers/LoginResolver';

export default class ProgramRepository extends TrainingJournalRepository {
  #user: ?LoggedInUser;
  constructor(user: ?LoggedInUser) {
    super(user);

    this.#user = user;
  }

  getProgram(id: string) {
    super.hasAccess();
    return programModel.findOne({ _id: id, user: this.#user?.id });
  }

  async addWeek(programId: string, weekName: string) {
    super.hasAccess();
    const program = await this.getProgram(programId);
    if (program == null) {
      return null;
    }

    const session = await trainingjournalConnection.startSession();
    try {
      session.startTransaction();
      const week = new WeekModel({
        name: weekName,
        program: programId,
      });
      await week.save({ session });
      program.weeks.push(week);
      program.save({ session });
      session.commitTransaction();
      return week;
    } catch {
      session.abortTransaction();
    }
    return null;
  }

  async userHasAccessToProgram(programId: string) {
    super.hasAccess();
    const program = await programModel.findOne({
      _id: programId,
      user: this.#user?.id,
    });
    return program != null;
  }
}
