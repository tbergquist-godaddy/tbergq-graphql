// @flow

import BaseRepository from '../../../common/repositories/BaseRepository';
import type { LoggedInUser } from '../../../resolvers/LoginResolver';

export default class TrainingJournalRepository extends BaseRepository {
  constructor(user: ?LoggedInUser) {
    super(user, 'trainingjournal');
  }
}
