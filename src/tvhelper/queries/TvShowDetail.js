// @flow

import { GraphQLID, GraphQLNonNull } from 'graphql';
import { fromGlobalId } from 'graphql-relay';

import TvShow from '../types/TvShow';
import type { GraphqlContextType } from '../../common/services/GraphqlContext';

type Args = {|
  +id: string,
|};

export default {
  name: 'tvShowDetail',
  description: 'Tv show lookup by id',
  type: TvShow,
  args: {
    id: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
  resolve: async (_: mixed, args: Args, { dataLoader }: GraphqlContextType) => {
    const { id } = fromGlobalId(args.id);
    const tvShow = await dataLoader.tvhelper.tvDetail.load(id);
    return tvShow;
  },
};
