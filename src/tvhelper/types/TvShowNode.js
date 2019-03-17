// @flow

import { GraphQLObjectType } from 'graphql';

import TvShow from './TvShow';

export default new GraphQLObjectType({
  name: 'TvShowNode',
  fields: {
    node: {
      type: TvShow,
      resolve: (ancestor: Object) => ancestor,
    },
  },
});
