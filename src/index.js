// @flow

import express, { type $Request, type $Response } from 'express';
import graphqlHTTP from 'express-graphql';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import { matchQueryMiddleware } from 'relay-compiler-plus';
import passport from 'passport';
import passportJwt from 'passport-jwt';

import Schema from './Schema';
import createContext from './common/services/GraphqlContext';
import queryMap from '../persisted-queries.json';
import { jwtFromRequest, tokenToUser, attachUserToRequest } from './auth';

const port = process.env.PORT || 3001;
const secret = process.env.JWT_SECRET;
passport.use(
  new passportJwt.Strategy(
    {
      secretOrKey: secret,
      jwtFromRequest,
    },
    tokenToUser,
  ),
);

const app = express();
app.use(cors({ methods: ['GET', 'POST'] }));
app.use(compression());
app.use(morgan('dev'));
passport.initialize();

function createGraphqlServer(token: ?string) {
  const context = createContext(token);
  return graphqlHTTP({
    schema: Schema,
    graphiql: true,
    context,
  });
}

app.use(
  '/',
  attachUserToRequest,
  matchQueryMiddleware(queryMap),
  (request: $Request, response: $Response) => {
    return createGraphqlServer(request)(request, response);
  },
);

if (process.env.NODE_ENV === 'production') {
  app.listen();
} else {
  app.listen(port);
}
console.log(`app running on http://localhost:${port}`); // eslint-disable-line no-console
