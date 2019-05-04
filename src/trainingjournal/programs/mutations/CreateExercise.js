// @flow

import { GraphQLNonNull } from 'graphql';
import { fromGlobalId } from '@kiwicom/graphql-global-id';

import fetch from '../../../common/services/Fetch';
import ExerciseInput, {
  type ExerciseInputType,
} from '../types/input/ExerciseInput';
import { type GraphqlContextType } from '../../../common/services/GraphqlContext';
import CreateExerciseEdge from '../types/output/CreateExerciseEdge';

type Args = {|
  +exercise: ExerciseInputType,
|};

export default {
  type: CreateExerciseEdge,
  args: {
    exercise: {
      type: GraphQLNonNull(ExerciseInput),
    },
  },
  resolve: async (
    _: mixed,
    { exercise }: Args,
    { rawToken }: GraphqlContextType,
  ) => {
    const body = {
      base_exercise: fromGlobalId(exercise.baseExerciseId),
      break_time: exercise.breakTime,
      day: fromGlobalId(exercise.dayId),
      description: exercise.description ?? '',
      reps: exercise.reps,
      set: exercise.set,
    };
    const token = rawToken ?? '';
    const newExercise = await fetch(
      'https://tronbe.pythonanywhere.com/api/Program/exercises/',
      {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
          Authorization: `Token ${token}`,
        },
      },
    );
    return { node: newExercise };
  },
};
