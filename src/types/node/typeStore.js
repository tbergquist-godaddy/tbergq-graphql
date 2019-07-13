// @flow

import type { GraphQLObjectType } from 'graphql';

/**
 * The sole purpose of the file is avoiding circular dependencies.
 * See https://github.com/graphql/graphql-relay-js/issues/113
 */

type Types = {|
  BaseExercise: ?GraphQLObjectType,
|};

const types: Types = {
  BaseExercise: null,
};

export function register(type: $Keys<typeof types>, value: GraphQLObjectType) {
  types[type] = value;
}

export function getType(type: $Keys<typeof types>): ?GraphQLObjectType {
  return types[type];
}
