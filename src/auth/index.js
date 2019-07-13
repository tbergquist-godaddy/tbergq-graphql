// @flow

import { type $Request, type $Response } from 'express';
import passport from 'passport';
import jwt from 'jsonwebtoken';

import { findOne } from '../tvhelper/db/models/UserModel';

const { JWT_SECRET } = process.env;
type JwtPayload = {|
  +iss: string,
  +username: string,
  +token?: string,
|};

export const jwtFromRequest = (request: $Request) =>
  request.get('Authorization');

export const tokenToUser = async (jwtPayload: JwtPayload, done: Function) => {
  if (jwtPayload.iss === 'tbergq-graphql.now.sh') {
    const user = await findOne(jwtPayload.username);

    done(null, {
      id: user._id,
      username: user.username,
      email: user.email,
    });
  } else if (jwtPayload.iss === 'tronbe.pythonanywhere.com') {
    done(null, {
      username: jwtPayload.username,
      token: jwtPayload.token,
    });
  } else {
    done(null, null);
  }
};

export const attachUserToRequest = (
  req: $Request,
  res: $Response,
  next: Function,
) => {
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
