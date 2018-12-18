// @flow

import type { LoggedInUser } from '../common/services/GraphqlContext';

export default (user: ?LoggedInUser): LoggedInUser => {
  if (user == null) {
    throw Error('You must be logged in to perform this operation');
  }
  return user;
};
