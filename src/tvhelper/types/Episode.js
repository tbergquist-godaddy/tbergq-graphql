// @flow

import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
} from 'graphql';
import { toGlobalId } from 'graphql-relay';
import { GraphQLDate } from 'graphql-iso-date';

import TvHelperImage from './TvHelperImage';
import type { Episode } from '../dataloaders/TvShowEpisodesLoader';
import Summary from './Summary';
import type { GraphqlContextType } from '../../common/services/GraphqlContext';

export default new GraphQLObjectType({
  name: 'Episode',
  description: 'Episodes of the tv show',
  fields: {
    id: {
      type: GraphQLID,
      resolve: ({ id }) => toGlobalId('episode', id),
    },
    image: {
      type: TvHelperImage,
    },
    name: {
      type: GraphQLString,
    },
    season: {
      type: GraphQLInt,
    },
    number: {
      type: GraphQLInt,
    },
    seasonAndNumber: {
      type: GraphQLString,
      description: 'Gives season and episode number on format S01E01',
      resolve: ({ season, number }: Episode) => {
        const paddedSeason = season < 10 ? `0${season}` : season;
        const paddedNumber = number < 10 ? `0${number}` : number;
        return `S${paddedSeason}E${paddedNumber}`;
      },
    },
    airdate: {
      type: GraphQLDate,
      resolve: ({ airdate }: Episode) => airdate || null, // Failes with nullish coalescing maybe date can be emptystring, which is invalid date
    },
    summary: Summary,
    watched: {
      type: GraphQLBoolean,
      resolve: async (
        { id }: Episode,
        _: mixed,
        { user, dataLoader }: GraphqlContextType,
      ) => {
        if (user == null) {
          return false;
        }
        const watched = await dataLoader.tvhelper.episodeWatched.load(id);

        return watched != null;
      },
    },
  },
});
