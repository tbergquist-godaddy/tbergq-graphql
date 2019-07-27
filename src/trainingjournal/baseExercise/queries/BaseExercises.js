// @flow

import {
  connectionArgs,
  type ConnectionArguments,
  cursorToOffset,
} from 'graphql-relay';

import BaseExerciseConnection from '../types/output/BaseExerciseConnection';
import type { GraphqlContextType } from '../../../common/services/GraphqlContext';
import type { BaseExerciseType } from '../dataloaders/BaseExercisesLoader';
import toConnection from '../../common/toConnection';

export default {
  name: 'BaseExercise',
  type: BaseExerciseConnection,
  args: connectionArgs,
  resolve: async (
    _: mixed,
    args: ConnectionArguments,
    { user, dataLoader }: GraphqlContextType,
  ) => {
    const offset = args.after ? cursorToOffset(args.after) + 1 : 0;
    const limit = args.first ?? 10;
    const exercises = await dataLoader.trainingjournal.baseExercises.load({
      limit,
      offset,
      user,
    });

    const baseExercises = exercises?.baseExercises ?? [];
    const count = exercises?.count ?? 0;

    return toConnection<BaseExerciseType>(baseExercises, {
      offset,
      next: offset + limit < count,
      previous: offset > 0,
    });
  },
};
