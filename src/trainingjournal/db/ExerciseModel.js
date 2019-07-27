// @flow

import { Schema } from 'mongoose';

import { trainingjournalConnection as mongoose } from '../../common/db/MongoDB';

export type ExerciseType = {|
  baseExercise: string,
  sets: string,
  reps: string,
  day: string,
  breakTime?: string,
  description?: string,
|};

const ExerciseSchema = new Schema({
  baseExercise: {
    type: Schema.Types.ObjectId,
    ref: 'baseexercise',
    required: true,
  },
  sets: {
    type: String,
    required: true,
  },
  reps: {
    type: String,
    required: true,
  },
  day: {
    type: Schema.Types.ObjectId,
    ref: 'day',
    required: true,
  },
  breakTime: {
    type: String,
  },
  description: {
    type: String,
  },
});

const ExerciseModel = mongoose.model('exercise', ExerciseSchema);

export default ExerciseModel;
