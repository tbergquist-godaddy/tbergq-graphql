// @flow

import { trainingjournalConnection } from '../../../common/db/MongoDB';
import BaseRepository from '../../../common/repositories/BaseRepository';
import programModel from '../../db/ProgramModel';
import WeekRepository from './WeekRepository';

export default class ProgramRepository extends BaseRepository {
  getProgram(id: string) {
    super.hasAccess();
    const user = super.getUser();
    return programModel.findOne({ _id: id, user: user?.id });
  }

  async addWeek(programId: string, weekName: string) {
    super.hasAccess();
    const program = await this.getProgram(programId);
    if (program == null) {
      return null;
    }
    const weekRepository = new WeekRepository(super.getUser(), super.getApp());
    const session = await trainingjournalConnection.startSession();
    try {
      session.startTransaction();
      const week = await weekRepository.createWeek(
        weekName,
        programId,
        session,
      );
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
    const user = super.getUser();
    const program = await programModel.findOne({
      _id: programId,
      user: user?.id,
    });
    return program != null;
  }
}
