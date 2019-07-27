// @flow

import { GraphQLObjectType, GraphQLString } from 'graphql';
import GlobalID from '@kiwicom/graphql-global-id';

import { type BaseExercise as BaseExerciseType } from '../../../programs/dataloaders/ProgramLoader';
import { nodeInterface } from '../../../../types/node/node';
import { register } from '../../../../types/node/typeStore';

const BaseExercise = new GraphQLObjectType({
  name: 'BaseExercise',
  interfaces: [nodeInterface],
  fields: {
    id: GlobalID(({ id }) => id),
    name: {
      type: GraphQLString,
    },
    videoLink: {
      type: GraphQLString,
      resolve: ({ youtube_link: videoLink }: BaseExerciseType) => videoLink,
    },
    description: {
      type: GraphQLString,
    },
    muscleGroup: {
      type: GraphQLString,
    },
  },
});

register('BaseExercise', BaseExercise);

export default BaseExercise;
