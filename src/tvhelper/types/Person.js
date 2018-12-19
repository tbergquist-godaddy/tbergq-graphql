// @flow

import { GraphQLObjectType, GraphQLID, GraphQLString } from 'graphql';
import { toGlobalId } from 'graphql-relay';

import type { Person } from '../dataloaders/SearchTvShowLoader';
import TvHelperImage from './TvHelperImage';

type Ancestor = {|
  ...Person,
  type: 'person' | 'character',
|};

export default new GraphQLObjectType({
  name: 'Person',
  fields: {
    id: {
      type: GraphQLID,
      resolve: ({ id, type }: Ancestor) => toGlobalId(type, id),
    },
    name: {
      type: GraphQLString,
    },
    image: {
      type: TvHelperImage,
    },
  },
});
