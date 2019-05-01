// @flow

import { GraphQLObjectType, GraphQLString } from 'graphql';
import GlobalID from '@kiwicom/graphql-global-id';
import {
  connectionDefinitions,
  connectionArgs,
  type ConnectionArguments,
  connectionFromArray,
} from 'graphql-relay';

import ExerciseConnection from './Exercise';
import type { Day as DayType, Exercise } from '../../dataloaders/ProgramLoader';

export const Day = new GraphQLObjectType({
  name: 'Day',
  fields: {
    id: GlobalID(({ id }) => id),
    name: {
      type: GraphQLString,
    },

    exercises: {
      type: ExerciseConnection,
      args: {
        ...connectionArgs,
      },
      resolve: ({ exercises }: DayType, args: ConnectionArguments) =>
        connectionFromArray<Exercise>(exercises, args),
    },
  },
});

const { connectionType: DayConnection } = connectionDefinitions({
  nodeType: Day,
});

export default DayConnection;
