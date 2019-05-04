// @flow

import { GraphQLObjectType } from 'graphql';

import { ExerciseEdge } from './Exercise';

export default new GraphQLObjectType({
  name: 'CreateExerciseEdge',
  fields: {
    exerciseEdge: {
      type: ExerciseEdge,
      resolve: ancestor => ancestor,
    },
  },
});
