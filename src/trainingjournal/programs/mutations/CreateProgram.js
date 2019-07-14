// @flow

import { GraphQLString, GraphQLNonNull } from 'graphql';

import MutationEdge from '../../../types/MutationEdge';
import type { GraphqlContextType } from '../../../common/services/GraphqlContext';
import { createProgram } from '../../db/ProgramModel';

type Args = {|
  +name: string,
|};

export default {
  name: 'CreateProgram',
  description: 'Create a trainingjournal program',
  type: MutationEdge,
  args: {
    name: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
  resolve: async (_: mixed, args: Args, { user }: GraphqlContextType) => {
    const program = await createProgram(args.name, user);
    return {
      success: program != null,
      edge: {
        id: program?._id,
        name: program?.name,
        date: program?.date,
        type: 'Program',
      },
    };
  },
};
