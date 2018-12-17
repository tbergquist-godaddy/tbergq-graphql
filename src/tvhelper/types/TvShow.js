// @flow

import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLFloat,
  GraphQLBoolean,
} from 'graphql';
import { toGlobalId } from 'graphql-relay';
import { GraphQLDate } from 'graphql-iso-date';
import striptags from 'striptags';

import type { TvShow } from '../dataloaders/SearchTvShowLoader';
import TvHelperImage from './TvHelperImage';

export default new GraphQLObjectType({
  name: 'TvShow',
  fields: {
    id: {
      type: GraphQLID,
      resolve: ({ id }: TvShow) => toGlobalId('tvShow', id.toString()),
    },
    name: {
      type: GraphQLString,
    },
    status: {
      type: GraphQLString,
    },
    premiered: {
      type: GraphQLDate,
    },
    rating: {
      type: GraphQLFloat,
      resolve: ({ rating }: TvShow) => rating.average,
    },
    image: {
      type: TvHelperImage,
    },
    summary: {
      type: GraphQLString,
      args: {
        stripTags: {
          type: GraphQLBoolean,
          defaultValue: true,
        },
      },
      resolve: ({ summary }: TvShow, args: {| +stripTags: boolean |}) => {
        if (args.stripTags) {
          return striptags(summary);
        }
        return summary;
      },
    },
  },
});
