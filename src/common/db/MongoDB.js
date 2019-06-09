// @flow

import { config } from 'dotenv';
import mongoose from 'mongoose';

config();

const { NODE_ENV, DB_URL: uri, GRAPHQL_DB_URL } = process.env;

if (uri == null) {
  throw Error('No db url found');
}

export const tvhelperConnection = mongoose.createConnection(uri, {
  useCreateIndex: true,
  useNewUrlParser: true,
});

export const graphqlConnection = mongoose.createConnection(GRAPHQL_DB_URL, {
  useCreateIndex: true,
  useNewUrlParser: true,
});

mongoose.set('debug', NODE_ENV === 'development');
