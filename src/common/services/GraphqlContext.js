// @flow

import DataLoader from 'dataloader';

import Userloader from '../../dataloader/Userloader';
import type { UserType } from '../db/UserModel';

export type GraphqlContextType = {|
  +dataLoader: {|
    +user: DataLoader<string, UserType>,
  |},
|};

export default function createContext() {
  return {
    dataLoader: {
      user: Userloader,
    },
  };
}
