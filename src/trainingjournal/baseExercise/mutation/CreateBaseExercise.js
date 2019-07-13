// @flow

import { GraphQLNonNull } from 'graphql';

import MutationEdge from '../../../types/MutationEdge';
import BaseExerciseInput, {
  type BaseExerciseInputType,
} from '../types/input/BaseExerciseInput';
import { createExercise } from '../../db/BaseExerciseModel';
import type { GraphqlContextType } from '../../../common/services/GraphqlContext';

type Args = {|
  +baseExercise: BaseExerciseInputType,
|};

export default {
  name: 'CreateBaseExercise',
  type: MutationEdge,
  args: {
    baseExercise: {
      type: GraphQLNonNull(BaseExerciseInput),
    },
  },
  resolve: async (_: mixed, args: Args, { user }: GraphqlContextType) => {
    const baseExercise = await createExercise(args.baseExercise, user);

    return {
      success: true,
      edge: {
        id: baseExercise?._id,
        name: baseExercise?.name,
        muscleGroup: baseExercise?.muscleGroup,
        description: baseExercise?.description,
        type: 'BaseExercise',
      },
    };
  },
};
