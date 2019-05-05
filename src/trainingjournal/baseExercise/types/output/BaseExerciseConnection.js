// @flow

import { connectionDefinitions } from 'graphql-relay';

import BaseExercise from './BaseExercise';

const { connectionType: BaseExerciseConnection } = connectionDefinitions({
  nodeType: BaseExercise,
});

export default BaseExerciseConnection;
