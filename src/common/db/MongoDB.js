// @flow

import { config } from 'dotenv';
import mongoose from 'mongoose';

config();

const { NODE_ENV, DB_URL: uri } = process.env;

if (uri == null) {
  throw Error('No db url found');
}

mongoose.connect(
  uri,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
  },
);

mongoose.set('debug', NODE_ENV === 'development');

export default mongoose;
