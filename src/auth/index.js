// @flow

import { type $Request, type $Response } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import { findOne } from '../tvhelper/db/models/UserModel';
import { findOne as findOneTjUser } from '../trainingjournal/db/UserModel';
import type { Apps } from '../resolvers/LoginResolver';

const { JWT_SECRET } = process.env;
type JwtPayload = {|
  +iss: string,
  +username: string,
  +token?: string,
  +app?: Apps,
|};

export const jwtFromRequest = (request: $Request) => request.get('Authorization');

const getFindUserFunction = (app: ?Apps) => {
  switch (app) {
    case 'tvhelper':
      return findOne;
    case 'trainingjournal':
      return findOneTjUser;
    default:
      throw new Error('Unkown app type.');
  }
};

export const tokenToUser = async (jwtPayload: JwtPayload, done: Function) => {
  const findUserFunction = getFindUserFunction(jwtPayload.app);
  const user = await findUserFunction(jwtPayload.username);
  if (user != null) {
    done(null, {
      id: user._id,
      username: user.username,
      email: user.email,
      app: jwtPayload.app,
    });
  } else {
    done(null, null);
  }
};

export const attachUserToRequest = (req: $Request, res: $Response, next: Function) => {
  // eslint-disable-next-line handle-callback-err
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (user) {
      req.user = user;
    }

    next();
  })(req, res, next);
};

export const signToken = (user: { [string]: mixed, ... }) => {
  return jwt.sign(user, JWT_SECRET, {
    expiresIn: '1y',
    issuer: 'tbergq-graphql.now.sh',
  });
};
