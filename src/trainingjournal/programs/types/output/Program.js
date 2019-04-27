// @flow

import { GraphQLObjectType, GraphQLString } from 'graphql';
import GlobalID from '@kiwicom/graphql-global-id';
import {
  connectionFromArray,
  connectionArgs,
  type ConnectionArguments,
} from 'graphql-relay';

import WeekConnection from './Week';
import type { Program, Week } from '../../dataloaders/ProgramLoader';

export default new GraphQLObjectType({
  name: 'Program',
  fields: {
    id: GlobalID(({ id }) => id),
    name: {
      type: GraphQLString,
    },

    weeks: {
      type: WeekConnection,
      args: {
        ...connectionArgs,
      },
      resolve: ({ weeks }: Program, args: ConnectionArguments) =>
        connectionFromArray<Week>(weeks, args),
    },
  },
});
