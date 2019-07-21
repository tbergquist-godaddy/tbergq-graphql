// @flow

import { GraphQLObjectType, GraphQLString } from 'graphql';
import GlobalID from '@kiwicom/graphql-global-id';
import {
  connectionDefinitions,
  connectionFromArray,
  connectionArgs,
  type ConnectionArguments,
} from 'graphql-relay';

import DayConnection from './Day';
import type { Week as WeekType } from '../../dataloaders/ProgramLoader';
import type { Day } from '../../dataloaders/DayLoader';
import { nodeInterface } from '../../../../types/node/node';
import { register } from '../../../../types/node/typeStore';
import type { GraphqlContextType } from '../../../../common/services/GraphqlContext';

const Week = new GraphQLObjectType({
  name: 'Week',
  interfaces: [nodeInterface],
  fields: {
    id: GlobalID(({ id, _id }) => id ?? _id),
    name: {
      type: GraphQLString,
    },

    days: {
      type: DayConnection,
      args: {
        ...connectionArgs,
      },
      resolve: async (
        { days }: WeekType,
        args: ConnectionArguments,
        { dataLoader }: GraphqlContextType,
      ) => {
        const dbDays = await dataLoader.trainingjournal.day.loadMany(days);
        return dbDays == null ? null : connectionFromArray<Day>(dbDays, args);
      },
    },
  },
});

const { connectionType: WeekConnection } = connectionDefinitions({
  nodeType: Week,
});

register('Week', Week);

export default WeekConnection;
