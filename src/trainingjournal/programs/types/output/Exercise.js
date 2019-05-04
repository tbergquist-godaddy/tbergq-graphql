// @flow

import { GraphQLObjectType, GraphQLString } from 'graphql';
import GlobalID from '@kiwicom/graphql-global-id';
import { connectionDefinitions } from 'graphql-relay';

import type { Exercise as ExerciseType } from '../../dataloaders/ProgramLoader';
import BaseExercise from './BaseExercise';

const Exercise = new GraphQLObjectType({
  name: 'Exercise',
  fields: {
    id: GlobalID(({ id }) => id),
    name: {
      type: GraphQLString,
    },
    set: {
      type: GraphQLString,
    },
    reps: {
      type: GraphQLString,
    },
    breakTime: {
      type: GraphQLString,
      resolve: ({ break_time: breakTime }: ExerciseType) => breakTime,
    },
    baseExercise: {
      type: BaseExercise,
      resolve: ({ base_exercise: baseExercise }: ExerciseType) => baseExercise,
    },
  },
});

const {
  connectionType: ExerciseConnection,
  edgeType: ExerciseEdge,
} = connectionDefinitions({
  nodeType: Exercise,
});

export { ExerciseEdge };
export default ExerciseConnection;
