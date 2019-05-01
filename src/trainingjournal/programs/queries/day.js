// @flow

import { GraphQLID, GraphQLNonNull } from 'graphql';
import { fromGlobalId } from '@kiwicom/graphql-global-id';

import { Day } from '../types/output/Day';
import type { GraphqlContextType } from '../../../common/services/GraphqlContext';

type Args = {|
  +dayId: string,
|};

export default {
  name: 'Day',
  type: Day,
  args: {
    dayId: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (_: mixed, args: Args, { dataLoader }: GraphqlContextType) => {
    const dayId = fromGlobalId(args.dayId);
    const day = await dataLoader.trainingjournal.day.load(dayId);

    return day;
  },
};
