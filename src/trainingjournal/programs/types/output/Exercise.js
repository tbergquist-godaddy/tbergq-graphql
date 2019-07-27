// @flow

import { GraphQLObjectType, GraphQLString } from 'graphql';
import GlobalID from '@kiwicom/graphql-global-id';
import { connectionDefinitions } from 'graphql-relay';

import BaseExercise from '../../../baseExercise/types/output/BaseExercise';
import { nodeInterface } from '../../../../types/node/node';
import { register } from '../../../../types/node/typeStore';

const Exercise = new GraphQLObjectType({
  name: 'Exercise',
  interfaces: [nodeInterface],
  fields: {
    id: GlobalID(({ id, _id }) => id ?? _id),
    sets: {
      type: GraphQLString,
    },
    reps: {
      type: GraphQLString,
    },
    breakTime: {
      type: GraphQLString,
    },
    baseExercise: {
      type: BaseExercise,
    },
  },
});

const { connectionType: ExerciseConnection, edgeType: ExerciseEdge } = connectionDefinitions({
  nodeType: Exercise,
});

register('Exercise', Exercise);

export { ExerciseEdge };
export default ExerciseConnection;
