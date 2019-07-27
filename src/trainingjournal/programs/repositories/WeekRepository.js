// @flow

import TrainingJournalRepository from './TrainingJournalRepository';
import WeekModel, { getWeeks } from '../../db/WeekModel';
import ProgramRepository from './ProgramRepository';
import DayRepository from './DayRepository';
import { trainingjournalConnection } from '../../../common/db/MongoDB';

export default class WeekRepository extends TrainingJournalRepository {
  getWeeks(ids: $ReadOnlyArray<string>) {
    super.hasAccess();
    return getWeeks(ids);
  }

  createWeek(weekName: string, programId: string, session: $FlowFixMe) {
    const week = new WeekModel({
      name: weekName,
      program: programId,
    });

    week.save({ session });
    return week;
  }

  async addDay(dayName: string, weekId: string) {
    const user = super.getUser();
    const programRepository = new ProgramRepository(user);
    const dayRepository = new DayRepository(user);
    const week = await WeekModel.findById(weekId);

    if (!(await programRepository.userHasAccessToProgram(week?.program)) || week == null) {
      return null;
    }
    const session = await trainingjournalConnection.startSession();
    try {
      session.startTransaction();
      const day = await dayRepository.createDay(dayName, weekId, session);
      week.days.push(day);
      await week.save({ session });
      session.commitTransaction();
      return day;
    } catch {
      session.abortTransaction();
    }
    return null;
  }
}
