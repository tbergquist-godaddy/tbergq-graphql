// @flow

import { GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';
import { fromGlobalId } from '@kiwicom/graphql-global-id';

import MutationEdge from '../../../types/MutationEdge';
import type { GraphqlContextType } from '../../../common/services/GraphqlContext';
import WeekRepository from '../repositories/WeekRepository';

type Args = {|
  +name: string,
  +weekId: string,
|};

export default {
  name: 'CreateDay',
  description: 'Add a day to a week',
  type: MutationEdge,
  args: {
    name: {
      type: GraphQLNonNull(GraphQLString),
    },
    weekId: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (_: mixed, args: Args, { user }: GraphqlContextType) => {
    const weekId = fromGlobalId(args.weekId);
    const repository = new WeekRepository(user, 'trainingjournal');
    const day = await repository.addDay(args.name, weekId);
    return {
      success: day != null,
      edge: {
        id: day?._id ?? '',
        name: day?.name,
        type: 'Day',
      },
    };
  },
};
