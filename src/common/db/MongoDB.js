// @flow

import { config } from 'dotenv';
import mongoose from 'mongoose';

config();

const uri = process.env.DB_URL;

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

export default mongoose;
