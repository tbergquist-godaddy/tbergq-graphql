// @flow

import { GraphQLNonNull } from 'graphql';
import { fromGlobalId } from '@kiwicom/graphql-global-id';

import ExerciseInput, { type ExerciseInputType } from '../types/input/ExerciseInput';
import { type GraphqlContextType } from '../../../common/services/GraphqlContext';
import MutationEdge from '../../../types/MutationEdge';
import DayRepository from '../repositories/DayRepository';

type Args = {|
  +exercise: ExerciseInputType,
|};

export default {
  type: MutationEdge,
  args: {
    exercise: {
      type: GraphQLNonNull(ExerciseInput),
    },
  },
  resolve: async (_: mixed, { exercise }: Args, { user }: GraphqlContextType) => {
    const repository = new DayRepository(user);
    const dayId = fromGlobalId(exercise.dayId);
    const body = {
      baseExercise: fromGlobalId(exercise.baseExerciseId),
      breakTime: exercise.breakTime,
      day: dayId,
      description: exercise.description ?? '',
      reps: exercise.reps,
      sets: exercise.sets,
    };
    const dbExercise = await repository.addExercise(dayId, body);

    return {
      success: dbExercise != null,
      edge: {
        id: dbExercise?._id ?? '',
        name: dbExercise?.name,
        sets: dbExercise?.sets,
        reps: dbExercise?.reps,
        breakTime: dbExercise?.breakTime,
        baseExercise: dbExercise?.baseExercise,
        type: 'Exercise',
      },
    };
  },
};
