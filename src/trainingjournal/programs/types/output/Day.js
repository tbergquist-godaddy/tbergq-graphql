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
import { nodeInterface } from '../../../../types/node/node';
import { register } from '../../../../types/node/typeStore';

export const Day = new GraphQLObjectType({
  name: 'Day',
  interfaces: [nodeInterface],
  fields: {
    id: GlobalID(({ id, _id }) => id ?? _id),
    name: {
      type: GraphQLString,
    },

    exercises: {
      type: ExerciseConnection,
      args: {
        ...connectionArgs,
      },
      resolve: ({ exercises }: DayType, args: ConnectionArguments) => {
        return exercises == null ? null : connectionFromArray<Exercise>(exercises, args);
      },
    },
  },
});

const { connectionType: DayConnection } = connectionDefinitions({
  nodeType: Day,
});

register('Day', Day);

export default DayConnection;
