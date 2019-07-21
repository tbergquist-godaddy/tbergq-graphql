// @flow

import BaseRepository from '../../../common/repositories/BaseRepository';
import WeekModel, { getWeeks } from '../../db/WeekModel';

export default class WeekRepository extends BaseRepository {
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
}
