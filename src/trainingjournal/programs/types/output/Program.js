// @flow

import { GraphQLObjectType, GraphQLString } from 'graphql';
import GlobalID from '@kiwicom/graphql-global-id';
import {
  connectionFromArray,
  connectionArgs,
  type ConnectionArguments,
} from 'graphql-relay';
import { GraphQLDate } from 'graphql-iso-date';

import WeekConnection from './Week';
import type {
  Program as ProgramType,
  Week,
} from '../../dataloaders/ProgramLoader';
import { register } from '../../../../types/node/typeStore';
import { nodeInterface } from '../../../../types/node/node';

const Program = new GraphQLObjectType({
  name: 'Program',
  interfaces: [nodeInterface],
  fields: {
    id: GlobalID(({ id, _id }) => id ?? _id),
    name: {
      type: GraphQLString,
    },

    date: {
      type: GraphQLDate,
    },

    weeks: {
      type: WeekConnection,
      args: {
        ...connectionArgs,
      },
      resolve: async (
        { weeks }: ProgramType,
        args: ConnectionArguments,
        { dataLoader }: Object,
      ) => {
        const dbWeeks =
          (await dataLoader.trainingjournal.week.loadMany(weeks)) ?? [];

        return dbWeeks != null
          ? connectionFromArray<Week>(dbWeeks, args)
          : null;
      },
    },
  },
});

register('Program', Program);

export default Program;
