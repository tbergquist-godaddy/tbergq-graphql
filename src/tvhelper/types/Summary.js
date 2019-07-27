// @flow

import { GraphQLString, GraphQLBoolean } from 'graphql';
import striptags from 'striptags';

type Ancestor = {
  +summary: string,
  ...
};

export default {
  type: GraphQLString,
  args: {
    stripTags: {
      type: GraphQLBoolean,
      defaultValue: true,
    },
  },
  resolve: ({ summary }: Ancestor, args: {| +stripTags: boolean |}) => {
    if (args.stripTags) {
      return striptags(summary);
    }
    return summary;
  },
};
