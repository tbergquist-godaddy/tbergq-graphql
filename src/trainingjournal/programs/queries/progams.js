// @flow

import { GraphQLString } from 'graphql';
import { connectionArgs, cursorToOffset } from 'graphql-relay';

import ProgramConnection from '../types/output/ProgramConnection';
import type { GraphqlContextType } from '../../../common/services/GraphqlContext';
import toConnection from '../../common/toConnection';
import { type ProgramsItem } from '../dataloaders/ProgramsLoader';

type Args = {|
  +first: number,
  +after?: string,
|};

export default {
  name: 'Progrms',
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
    { dataLoader, rawToken }: GraphqlContextType,
  ) => {
    const offset = args.after ? cursorToOffset(args.after) + 1 : 0;
    const programs = await await dataLoader.trainingjournal.programs.load({
      limit: args.first,
      offset,
      token: rawToken,
    });

    return toConnection<ProgramsItem>(programs.results, {
      offset,
      next: programs.next,
      previous: programs.previous,
    });
  },
};
