// @flow

import { nodeDefinitions } from 'graphql-relay';

import { getType } from './typeStore';

function loadType() {
  // We are not using nodeinterface to query yet
  return null;
}

function detectType(value) {
  switch (value.type) {
    case 'BaseExercise':
    case 'Program':
      return getType(value.type);
    default:
      return null;
  }
}

export const { nodeInterface, nodeField } = nodeDefinitions(
  loadType,
  detectType,
);
