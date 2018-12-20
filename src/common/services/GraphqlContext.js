// @flow

import DataLoader from 'dataloader';
import jwt from 'jsonwebtoken';
import { config } from 'dotenv';

import Userloader from '../../dataloader/Userloader';
import type { UserType } from '../db/UserModel';
import SearchTvShowLoader, {
  type TvShow,
} from '../../tvhelper/dataloaders/SearchTvShowLoader';
import TvDetailLoader from '../../tvhelper/dataloaders/TvDetailLoader';
import TvHelperUserLoader, {
  type UserType as TvHelperUser,
} from '../../tvhelper/dataloaders/UserLoader';
import FavoritesLoader, {
  type Favorites,
} from '../../tvhelper/dataloaders/FavoritesLoader';
import EpisodeLoader, {
  type Episode,
} from '../../tvhelper/dataloaders/EpisodeLoader';
import FavoriteLoader, {
  type FavoriteArgs,
} from '../../tvhelper/dataloaders/FavoriteLoader';

config();

const { JWT_SECRET } = process.env;

export type LoggedInUser = {|
  +id: string,
  +username: string,
|};

export type GraphqlContextType = {|
  +user: ?LoggedInUser,
  +dataLoader: {|
    +user: DataLoader<string, UserType>,
    +tvhelper: {|
      +searchTvShow: DataLoader<string, TvShow[]>,
      +tvDetail: DataLoader<string, TvShow>,
      +user: DataLoader<string, TvHelperUser>,
      +favorites: DataLoader<string, Favorites[]>,
      +episodes: DataLoader<string, Episode[]>,
      +favorite: DataLoader<FavoriteArgs, Favorites>,
    |},
  |},
|};

const decodeToken = (token: ?string) => {
  try {
    return token == null ? null : jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return null;
  }
};

export default function createContext(token: ?string) {
  const user = decodeToken(token);
  return {
    user,
    dataLoader: {
      user: Userloader,
      tvhelper: {
        searchTvShow: SearchTvShowLoader(),
        tvDetail: TvDetailLoader(),
        user: TvHelperUserLoader(),
        favorites: FavoritesLoader(),
        episodes: EpisodeLoader(),
        favorite: FavoriteLoader(),
      },
    },
  };
}
