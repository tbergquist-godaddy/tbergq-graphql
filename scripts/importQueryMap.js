// @flow

import fs from 'fs';
import path from 'path';

// $FlowExpectedError: Simple way to start using persisted queries, improve later
import persistedQueries from '../../tvhelper-app/persisted-queries.json';

fs.writeFileSync(
  path.join(__dirname, '..', 'persisted-queries.json'),
  JSON.stringify(persistedQueries, null, 2),
);
