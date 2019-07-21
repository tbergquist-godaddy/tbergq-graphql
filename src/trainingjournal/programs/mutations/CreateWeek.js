// @flow

import { GraphQLNonNull, GraphQLString, GraphQLID } from 'graphql';
import { fromGlobalId } from '@kiwicom/graphql-global-id';

import MutationEdge from '../../../types/MutationEdge';
import type { GraphqlContextType } from '../../../common/services/GraphqlContext';
import ProgramRepository from '../repositories/ProgramRepository';

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
    const repository = new ProgramRepository(user, 'trainingjournal');
    const week = await repository.addWeek(programId, args.name);
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
