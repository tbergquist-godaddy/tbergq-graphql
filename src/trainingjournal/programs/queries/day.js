// @flow

import { GraphQLID, GraphQLNonNull } from 'graphql';
import { fromGlobalId } from '@kiwicom/graphql-global-id';

import { Day } from '../types/output/Day';
import type { GraphqlContextType } from '../../../common/services/GraphqlContext';
import DayRepository from '../repositories/DayRepository';

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
  resolve: async (_: mixed, args: Args, { user }: GraphqlContextType) => {
    const dayId = fromGlobalId(args.dayId);
    const repository = new DayRepository(user);
    const day = await repository.getDay(dayId);

    return day;
  },
};
