// @flow

import DataLoader from 'dataloader';

import Userloader from '../../dataloader/Userloader';
import type { UserType } from '../db/UserModel';
import SearchTvShowLoader, {
  type TvShow,
} from '../../tvhelper/dataloaders/SearchTvShowLoader';
import TvDetailLoader from '../../tvhelper/dataloaders/TvDetailLoader';

export type GraphqlContextType = {|
  +dataLoader: {|
    +user: DataLoader<string, UserType>,
    +tvhelper: {|
      +searchTvShow: DataLoader<string, TvShow[]>,
      +tvDetail: DataLoader<string, TvShow>,
    |},
  |},
|};

export default function createContext() {
  return {
    dataLoader: {
      user: Userloader,
      tvhelper: {
        searchTvShow: SearchTvShowLoader(),
        tvDetail: TvDetailLoader(),
      },
    },
  };
}
