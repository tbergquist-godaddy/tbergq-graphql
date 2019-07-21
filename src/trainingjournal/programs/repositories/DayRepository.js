// @flow

import TrainingJournalRepository from './TrainingJournalRepository';
import DayModel from '../../db/DayModel';
import ProgramModel from '../../db/ProgramModel';
import WeekModel from '../../db/WeekModel';

export default class DayRepository extends TrainingJournalRepository {
  async createDay(dayName: string, weekId: string, session: $FlowFixMe) {
    const day = new DayModel({
      name: dayName,
      week: weekId,
    });
    await day.save({ session });
    return day;
  }

  getDays(ids: $ReadOnlyArray<string>) {
    // Should be called from a dataloader and access has already been verified
    return DayModel.find({ _id: { $in: ids } });
  }

  async getDay(id: string) {
    super.hasAccess();
    const user = super.getUser();
    const day = await DayModel.findById(id);
    const week = await WeekModel.findById(day.week);
    const program = await ProgramModel.findOne({
      _id: week.program,
      user: user?.id,
    });

    return program == null ? null : day;
  }
}
