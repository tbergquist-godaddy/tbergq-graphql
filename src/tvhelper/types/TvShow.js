// @flow

import {
  GraphQLObjectType,
  GraphQLID,
  GraphQLString,
  GraphQLFloat,
  GraphQLBoolean,
  GraphQLList,
} from 'graphql';
import { toGlobalId, fromGlobalId } from 'graphql-relay';
import { GraphQLDate } from 'graphql-iso-date';

import type { TvShow } from '../dataloaders/SearchTvShowLoader';
import TvHelperImage from './TvHelperImage';
import type { GraphqlContextType } from '../../common/services/GraphqlContext';
import Episode from './Episode';
import Summary from './Summary';
import resolvePreviousEpisode from '../resolvers/ResolvePreviousEpisode';
import resolveNextEpisode from '../resolvers/ResolveNextEpisode';
import Cast from './Cast';

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
    summary: Summary,
    isFavorite: {
      type: GraphQLBoolean,
      resolve: async (
        { id: serieId }: TvShow,
        _: mixed,
        { user, dataLoader }: GraphqlContextType,
      ) => {
        if (user == null) {
          return null;
        }
        const { id: userId } = fromGlobalId(user.id);
        const favorite = await dataLoader.tvhelper.favorite.load({
          userId,
          serieId,
        });

        return favorite != null;
      },
    },
    episodes: {
      type: GraphQLList(Episode),
      resolve: async ({ id, _embedded }: TvShow, _: mixed, { dataLoader }) => {
        const episodes =
          _embedded?.episodes ?? (await dataLoader.tvhelper.episodes.load(id));

        return episodes;
      },
    },
    previousEpisode: {
      type: GraphQLDate,
      resolve: async (
        { _embedded, id }: TvShow,
        _: mixed,
        { dataLoader }: GraphqlContextType,
      ) =>
        _embedded?.previousepisode?.airdate ??
        resolvePreviousEpisode(dataLoader, id),
    },
    nextEpisode: {
      type: GraphQLDate,
      resolve: async (
        { _embedded, id }: TvShow,
        _: mixed,
        { dataLoader }: GraphqlContextType,
      ) =>
        _embedded?.nextepisode?.airdate ?? resolveNextEpisode(dataLoader, id),
    },
    cast: {
      type: GraphQLList(Cast),
      resolve: ({ _embedded }: TvShow) => _embedded?.cast,
    },
  },
});
