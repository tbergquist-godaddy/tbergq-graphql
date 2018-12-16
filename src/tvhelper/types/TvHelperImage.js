// @flow

import { GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';
import { toGlobalId } from 'graphql-relay';

type Ancestor = {|
  +medium: string,
  +original: string,
|};

export default new GraphQLObjectType({
  name: 'TvHelperImage',
  fields: {
    id: {
      type: GraphQLID,
      resolve: ({ original }: Ancestor) =>
        toGlobalId('tvHelperImage', original),
    },
    original: {
      type: GraphQLString,
    },
    medium: {
      type: GraphQLString,
    },
  },
});
