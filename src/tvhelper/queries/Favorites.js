// @flow

import {
  fromGlobalId,
  connectionFromArray,
  connectionArgs,
  type ConnectionArguments,
} from 'graphql-relay';
import * as R from 'ramda';

import TvShowConnection from '../types/TvShowConnection';
import type { GraphqlContextType } from '../../common/services/GraphqlContext';
import type { TvShow as TvShowType } from '../dataloaders/SearchTvShowLoader';
import SortOptions from '../types/input/SortOptions';

type SortBy =
  | 'name'
  | '_embedded.nextepisode.airdate'
  | '_embedded.previousepisode.airdate'
  | 'status';
type Args = {|
  +options: {|
    +sortDirection: 'ascending' | 'descending',
    +sortBy: SortBy,
  |},
  ...$Exact<ConnectionArguments>,
|};
export default {
  name: 'Favorites',
  type: TvShowConnection,
  description: 'Get your favorites',
  args: {
    ...connectionArgs,
    options: {
      type: SortOptions,
      defaultValue: {
        sortDirection: 'ascending',
        sortBy: 'name',
      },
    },
  },
  resolve: async (
    _: mixed,
    args: Args,
    { user, dataLoader }: GraphqlContextType,
  ) => {
    if (user == null) {
      throw Error('You must be signed in to use this query');
    }

    const { id } = fromGlobalId(user.id);
    const savedFavorites = await dataLoader.tvhelper.favorites.load(id);
    const serieIds = savedFavorites.map(item => item.serieId.toString());
    const favorites = await dataLoader.tvhelper.tvDetail.loadMany(serieIds);

    const sortBy =
      args.options.sortDirection === 'ascending'
        ? R.ascend(R.path(args.options.sortBy.split('.')))
        : R.descend(R.path(args.options.sortBy.split('.')));

    return connectionFromArray<TvShowType>(R.sort(sortBy, favorites), args);
  },
};
