// @flow

import { Schema } from 'mongoose';

import { trainingjournalConnection as mongoose } from '../../common/db/MongoDB';

export type UserType = {|
  +id: string,
  +username: string,
  +password: string,
|};

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const User = mongoose.model('users', UserSchema);

export const findOne = (username: string) => User.findOne({ username });

type CreateUserType = {|
  +username: string,
  +password: string,
  +email: string,
|};

export const createUser = (user: CreateUserType) => User.create(new User(user));
