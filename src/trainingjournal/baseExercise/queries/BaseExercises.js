// @flow

import {
  connectionArgs,
  type ConnectionArguments,
  cursorToOffset,
} from 'graphql-relay';

import BaseExerciseConnection from '../types/output/BaseExerciseConnection';
import type { GraphqlContextType } from '../../../common/services/GraphqlContext';
import type { BaseExercise } from '../../programs/dataloaders/ProgramLoader';
import toConnection from '../../common/toConnection';

export default {
  name: 'BaseExercise',
  type: BaseExerciseConnection,
  args: connectionArgs,
  resolve: async (
    _: mixed,
    args: ConnectionArguments,
    { dataLoader }: GraphqlContextType,
  ) => {
    const offset = args.after ? cursorToOffset(args.after) + 1 : 0;

    const baseExerciseResponse = await dataLoader.trainingjournal.baseExercises.load(
      {
        limit: args.first ?? 10,
        offset,
      },
    );

    return toConnection<BaseExercise>(baseExerciseResponse.results, {
      offset,
      next: baseExerciseResponse.next,
      previous: baseExerciseResponse.previous,
    });
  },
};
