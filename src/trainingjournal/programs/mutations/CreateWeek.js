// @flow

import { GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';
import { fromGlobalId } from '@kiwicom/graphql-global-id';

import MutationEdge from '../../../types/MutationEdge';
import type { GraphqlContextType } from '../../../common/services/GraphqlContext';
import { createWeek } from '../../db/WeekModel';

type Args = {|
  +name: string,
  +programId: string,
|};

export default {
  name: 'CreateWeek',
  description: 'Add a week to a program',
  type: MutationEdge,
  args: {
    name: {
      type: GraphQLNonNull(GraphQLString),
    },
    programId: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (_: mixed, args: Args, { user }: GraphqlContextType) => {
    const programId = fromGlobalId(args.programId);
    const week = await createWeek(args.name, programId, user);
    return {
      success: week != null,
      edge: {
        id: week?._id,
        name: week?.name,
        type: 'Week',
      },
    };
  },
};
