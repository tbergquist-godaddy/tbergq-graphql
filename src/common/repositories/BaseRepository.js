// @flow

import type { Apps, LoggedInUser } from '../../resolvers/LoginResolver';

export default class BaseRepository {
  #user: ?LoggedInUser;
  #app: Apps;

  constructor(user: ?LoggedInUser, app: Apps) {
    this.#user = user;
    this.#app = app;
  }

  hasAccess() {
    if (this.#user?.app !== this.#app) {
      throw new Error(`Expected user to have access to ${this.#app}, but user has not.`);
    }
  }

  getUser() {
    return this.#user;
  }

  getApp() {
    return this.#app;
  }
}
