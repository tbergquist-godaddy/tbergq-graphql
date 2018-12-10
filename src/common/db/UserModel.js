// @flow

import { Schema } from 'mongoose';
import mongoose from './MongoDB';

export type UserType = {|
  +id: string,
  +username: string,
  +password: string,
|};

const UserSchema = new Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('users', UserSchema);

export const findOne = (username: string) =>
  new Promise<UserType>((resolve, reject) => {
    User.findOne({ username }).exec((err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });

export default User;
