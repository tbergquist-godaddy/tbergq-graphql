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

export const addOperations = async (
  operations: $ReadOnlyArray<StoredOperationType>,
) => {
  const operationIds = operations.map(i => i.operationId);
  const existingOperations = await StoredOperation.find({
    operationId: { $in: operationIds },
  });
  const existingOperationIds = existingOperations.map(i => i.operationId);
  const operationsToAdd = operations.filter(
    i => !existingOperationIds.includes(i.operationId),
  );

  return StoredOperation.create(operationsToAdd);
};

StoredOperationSchema.indexes();
