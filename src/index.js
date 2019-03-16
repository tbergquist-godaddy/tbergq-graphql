// @flow

import express, { type $Request, type $Response } from 'express';
import graphqlHTTP from 'express-graphql';
import cors from 'cors';
import compression from 'compression';
import morgan from 'morgan';
import '@babel/polyfill';
import { matchQueryMiddleware } from 'relay-compiler-plus';

import Schema from './Schema';
import createContext from './common/services/GraphqlContext';
import queryMap from '../persisted-queries.json';

const port = process.env.PORT || 3001;

const app = express();
app.use(cors({ methods: ['GET', 'POST'] }));
app.use(compression());
app.use(morgan('dev'));

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
  matchQueryMiddleware(queryMap),
  (request: $Request, response: $Response) => {
    const token = request.get('Authorization');

    return createGraphqlServer(token)(request, response);
  },
);

if (process.env.NODE_ENV === 'production') {
  app.listen();
} else {
  app.listen(port);
}
console.log(`app running on http://localhost:${port}`); // eslint-disable-line no-console
