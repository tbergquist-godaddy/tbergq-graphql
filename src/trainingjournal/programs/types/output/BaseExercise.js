// @flow

import { GraphQLObjectType, GraphQLString } from 'graphql';
import GlobalID from '@kiwicom/graphql-global-id';

import type { BaseExercise } from '../../dataloaders/ProgramLoader';
import MuscleGroup from './MuscleGroup';

export default new GraphQLObjectType({
  name: 'BaseExercise',
  fields: {
    id: GlobalID(({ id }) => id),
    name: {
      type: GraphQLString,
    },
    videoLink: {
      type: GraphQLString,
      resolve: ({ youtube_link: videoLink }: BaseExercise) => videoLink,
    },
    description: {
      type: GraphQLString,
    },
    muscleGroup: {
      type: MuscleGroup,
      resolve: ({ muscle_group: muscleGroup }: BaseExercise) => muscleGroup,
    },
  },
});
