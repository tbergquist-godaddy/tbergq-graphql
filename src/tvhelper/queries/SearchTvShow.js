// @flow

import { GraphQLString, GraphQLNonNull } from 'graphql';
import {
  connectionFromArray,
  connectionArgs,
  type ConnectionArguments,
} from 'graphql-relay';

import TvShowConnection from '../types/TvShowConnection';
import type { GraphqlContextType } from '../../common/services/GraphqlContext';
import type { TvShow as TvShowType } from '../dataloaders/SearchTvShowLoader';

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
