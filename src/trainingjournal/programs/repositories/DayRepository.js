// @flow

import TrainingJournalRepository from './TrainingJournalRepository';
import DayModel from '../../db/DayModel';
import ProgramModel from '../../db/ProgramModel';
import WeekModel from '../../db/WeekModel';
import ExerciseModel, { type ExerciseType } from '../../db/ExerciseModel';

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

  async getProgram(day: $FlowFixMe) {
    const user = super.getUser();
    const week = await WeekModel.findById(day.week);
    const program = await ProgramModel.findOne({
      _id: week.program,
      user: user?.id,
    });
    return program;
  }

  async getDay(id: string) {
    super.hasAccess();
    const day = await DayModel.findById(id);
    const program = this.getProgram(day);

    return program == null ? null : day;
  }

  async addExercise(dayId: string, exercise: ExerciseType) {
    super.hasAccess();
    const day = await DayModel.findById(dayId);
    const program = this.getProgram(day);
    if (program == null) {
      return null;
    }

    const exerciseModel = new ExerciseModel(exercise);
    const session = await super.getSession();
    try {
      session.startTransaction();

      await exerciseModel.save({ session });
      day.exercises.push(exerciseModel);
      await day.save({ session });
      await session.commitTransaction();
      return exerciseModel;
    } catch {
      session.abortTransaction();
    }
    return null;
  }
}
