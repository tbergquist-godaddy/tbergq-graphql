// @flow

import { Schema } from 'mongoose';

import { graphqlConnection } from '../MongoDB';

type StoredOperationType = {|
  +operationId: string,
  +text: string,
|};

const StoredOperationSchema = new Schema({
  operationId: {
    type: String,
    required: true,
    unique: true,
  },
  text: {
    type: String,
    required: true,
  },
});

const StoredOperation = graphqlConnection.model(
  'persistedquery',
  StoredOperationSchema,
);

export const getOperation = (operationId: string) => {
  return StoredOperation.findOne({ operationId });
};

export const addOperations = (
  operations: $ReadOnlyArray<StoredOperationType>,
) => {
  return StoredOperation.create(operations);
};

StoredOperationSchema.indexes();
