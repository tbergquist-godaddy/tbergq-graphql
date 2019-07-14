// @flow

import { GraphQLString } from 'graphql';
import { connectionArgs, cursorToOffset } from 'graphql-relay';

import ProgramConnection from '../types/output/ProgramConnection';
import type { GraphqlContextType } from '../../../common/services/GraphqlContext';
import toConnection from '../../common/toConnection';
import type { Program } from '../../db/ProgramModel';

type Args = {|
  +first: number,
  +after?: string,
|};

export default {
  name: 'Program',
  type: ProgramConnection,
  args: {
    ...connectionArgs,
    first: {
      ...connectionArgs.first,
      defaultValue: 10,
    },
    after: {
      type: GraphQLString,
    },
  },
  resolve: async (
    _: mixed,
    args: Args,
    { dataLoader, user }: GraphqlContextType,
  ) => {
    const offset = args.after ? cursorToOffset(args.after) + 1 : 0;
    const programsResponse = await dataLoader.trainingjournal.programs.load({
      limit: args.first,
      offset,
      user,
    });

    const programs = programsResponse?.programs ?? [];
    const count = programsResponse?.count ?? 0;

    return toConnection<Program>(programs, {
      offset,
      next: count > offset + args.first,
      previous: offset > 0,
    });
  },
};
