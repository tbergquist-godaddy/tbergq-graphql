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
import Favorites from '../db/models/FavoritesModel';
import Episode from './Episode';
import Summary from './Summary';

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
        { id }: TvShow,
        _: mixed,
        { user }: GraphqlContextType,
      ) => {
        if (user == null) {
          return null;
        }
        const favorite = await Favorites.findOne({
          where: {
            userId: fromGlobalId(user.id).id,
            serieId: id,
          },
        });
        return favorite != null;
      },
    },
    episodes: {
      type: GraphQLList(Episode),
      resolve: async ({ id }: TvShow, _: mixed, { dataLoader }) => {
        const episodes = await dataLoader.tvhelper.episodes.load(id);
        return episodes;
      },
    },
    previousEpisode: {
      type: GraphQLDate,
      resolve: async ({ id }: TvShow, _: mixed, { dataLoader }) => {
        const episodes = await dataLoader.tvhelper.episodes.load(id);
        const today = new Date();
        const tomorrow = new Date(
          Date.UTC(today.getFullYear(), today.getMonth(), today.getDate() + 1),
        );
        const dates = episodes.reduce((acc, curr) => {
          if (curr.airdate == null) {
            return acc;
          }
          const airdate = new Date(curr.airdate);
          if (airdate < tomorrow) {
            return [...acc, airdate];
          }
          return acc;
        }, []);
        const date = dates.length > 0 ? new Date(Math.max(...dates)) : null;

        return date;
      },
    },
    nextEpisode: {
      type: GraphQLDate,
      resolve: async ({ id }: TvShow, _: mixed, { dataLoader }) => {
        const episodes = await dataLoader.tvhelper.episodes.load(id);
        const today = new Date();
        const utcToday = new Date(
          Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()),
        );
        const dates = episodes.reduce((acc, curr) => {
          if (curr.airdate == null) {
            return acc;
          }
          const airdate = new Date(curr.airdate);

          if (airdate >= utcToday) {
            return [...acc, airdate];
          }
          return acc;
        }, []);
        const date = dates.length > 0 ? new Date(Math.min(...dates)) : null;

        return date;
      },
    },
  },
});
