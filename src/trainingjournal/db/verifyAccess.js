// @flow

import type { LoggedInUser } from '../../common/services/GraphqlContext';

export default function verifyAccess(user: ?LoggedInUser) {
  return user?.app === 'trainingjournal';
}
