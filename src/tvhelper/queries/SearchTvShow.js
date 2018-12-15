// @flow

import { GraphQLString, GraphQLNonNull } from 'graphql';
import {
  connectionDefinitions,
  connectionFromArray,
  connectionArgs,
  type ConnectionArguments,
} from 'graphql-relay';

import TvShow from '../types/TvShow';
import type { GraphqlContextType } from '../../common/services/GraphqlContext';
import type { TvShow as TvShowType } from '../dataloaders/SearchTvShowLoader';

const { connectionType: TvShowConnection } = connectionDefinitions({
  nodeType: TvShow,
});

type Args = {|
  +query: string,
  ...$Exact<ConnectionArguments>,
|};

export default {
  name: 'SearchTvShow',
  description: 'Search for tv shows by name',
  type: TvShowConnection,
  args: {
    query: {
      type: GraphQLNonNull(GraphQLString),
    },
    ...connectionArgs,
  },
  resolve: async (_: mixed, args: Args, { dataLoader }: GraphqlContextType) => {
    const tvShows = await dataLoader.tvhelper.searchTvShow.load(args.query);

    return connectionFromArray<TvShowType>(tvShows, args);
  },
};
