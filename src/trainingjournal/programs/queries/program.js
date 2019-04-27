// @flow

import { GraphQLID, GraphQLNonNull } from 'graphql';
import { fromGlobalId } from '@kiwicom/graphql-global-id';

import Program from '../types/output/Program';
import type { GraphqlContextType } from '../../../common/services/GraphqlContext';

type Args = {|
  +programId: string,
|};

export default {
  name: 'Program',
  type: Program,
  args: {
    programId: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (_: mixed, args: Args, { dataLoader }: GraphqlContextType) => {
    const programId = fromGlobalId(args.programId);
    const program = await dataLoader.trainingjournal.program.load(programId);

    return program;
  },
};
