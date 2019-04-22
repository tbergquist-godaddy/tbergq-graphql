// @flow

import { GraphQLString } from 'graphql';
import { connectionArgs, cursorToOffset, offsetToCursor } from 'graphql-relay';

import ProgramConnection from '../types/output/ProgramConnection';
import type { GraphqlContextType } from '../../../common/services/GraphqlContext';

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

    const edges = programs.results.map((value, index) => ({
      cursor: offsetToCursor(offset + index),
      node: value,
    }));

    const firstEdge = edges[0];
    const lastEdge = edges[edges.length - 1];

    return {
      edges,
      pageInfo: {
        startCursor: firstEdge ? firstEdge.cursor : null,
        endCursor: lastEdge ? lastEdge.cursor : null,
        hasPreviousPage: programs.previous != null,
        hasNextPage: programs.next != null,
      },
    };
  },
};
