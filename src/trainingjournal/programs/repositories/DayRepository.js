// @flow

import BaseRepository from '../../../common/repositories/BaseRepository';
import DayModel from '../../db/DayModel';

export default class DayRepository extends BaseRepository {
  async createDay(dayName: string, weekId: string, session: $FlowFixMe) {
    const day = new DayModel({
      name: dayName,
      week: weekId,
    });
    await day.save({ session });
    return day;
  }
}
