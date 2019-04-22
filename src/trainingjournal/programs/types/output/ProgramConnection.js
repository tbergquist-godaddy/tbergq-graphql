// @flow

import { connectionDefinitions } from 'graphql-relay';

import Program from './Program';

const { connectionType: ProgramConnection } = connectionDefinitions({
  nodeType: Program,
});

export default ProgramConnection;
