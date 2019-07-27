// @flow

import BaseRepository from '../../../common/repositories/BaseRepository';
import type { LoggedInUser } from '../../../resolvers/LoginResolver';
import { trainingjournalConnection } from '../../../common/db/MongoDB';

export default class TrainingJournalRepository extends BaseRepository {
  constructor(user: ?LoggedInUser) {
    super(user, 'trainingjournal');
  }

  getSession() {
    return trainingjournalConnection.startSession();
  }
}
