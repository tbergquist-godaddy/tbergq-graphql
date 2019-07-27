// @flow

import DataLoader from 'dataloader';
import { type $Request } from 'express';

import SearchTvShowLoader, { type TvShow } from '../../tvhelper/dataloaders/SearchTvShowLoader';
import TvDetailLoader from '../../tvhelper/dataloaders/TvDetailLoader';
import TvHelperUserLoader, {
  type UserType as TvHelperUser,
} from '../../tvhelper/dataloaders/UserLoader';
import FavoritesLoader, { type Favorites } from '../../tvhelper/dataloaders/FavoritesLoader';
import TvShowEpisodesLoader, {
  type Episode,
} from '../../tvhelper/dataloaders/TvShowEpisodesLoader';
import FavoriteLoader, { type FavoriteArgs } from '../../tvhelper/dataloaders/FavoriteLoader';
import EpiosodeWatchedLoader, {
  type EpisodeWatched,
} from '../../tvhelper/dataloaders/EpisodeWatchedLoader';
import EpisodeLoader from '../../tvhelper/dataloaders/EpisodeLoader';
import ProgramsLoader, {
  type ProgramsParams,
  type Programs,
} from '../../trainingjournal/programs/dataloaders/ProgramsLoader';
import ProgramLoader, {
  type Program,
} from '../../trainingjournal/programs/dataloaders/ProgramLoader';
import DayLoader, { type Day } from '../../trainingjournal/programs/dataloaders/DayLoader';
import BaseExerciseLoader, {
  type BaseExerciseResponse,
  type BaseExercisesArgs,
} from '../../trainingjournal/baseExercise/dataloaders/BaseExercisesLoader';
import type { Apps } from '../../resolvers/LoginResolver';
import createWeeekLoader, {
  type Week,
} from '../../trainingjournal/programs/dataloaders/WeekLoader';

export type LoggedInUser = {|
  +id?: string,
  +username: string,
  +email?: string,
  +token?: string,
  +app: Apps,
|};

export type GraphqlContextType = {|
  +user: ?LoggedInUser,
  +dataLoader: {|
    +tvhelper: {|
      +searchTvShow: DataLoader<string, TvShow[]>,
      +tvDetail: DataLoader<string, TvShow>,
      +user: DataLoader<string, TvHelperUser>,
      +favorites: DataLoader<string, Favorites[]>,
      +episodes: DataLoader<string, Episode[]>,
      +favorite: DataLoader<FavoriteArgs, Favorites>,
      +episodeWatched: DataLoader<number, EpisodeWatched[]>,
      +episode: DataLoader<string, Episode>,
    |},
    +trainingjournal: {|
      +programs: DataLoader<ProgramsParams, Programs>,
      +program: DataLoader<string, Program>,
      +day: DataLoader<string, Day>,
      +baseExercises: DataLoader<BaseExercisesArgs, BaseExerciseResponse>,
      +week: DataLoader<string, Week>,
    |},
  |},
|};

export default function createContext(request: $Request) {
  const user = request?.user;
  return {
    user,
    dataLoader: {
      tvhelper: {
        searchTvShow: SearchTvShowLoader(),
        tvDetail: TvDetailLoader(),
        user: TvHelperUserLoader(),
        favorites: FavoritesLoader(),
        episodes: TvShowEpisodesLoader(),
        favorite: FavoriteLoader(),
        episodeWatched: EpiosodeWatchedLoader(user),
        episode: EpisodeLoader(),
      },
      trainingjournal: {
        programs: ProgramsLoader(),
        program: ProgramLoader(user),
        day: DayLoader(user),
        baseExercises: BaseExerciseLoader(),
        week: createWeeekLoader(user),
      },
    },
  };
}
