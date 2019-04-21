// @flow

import fs from 'fs';
import path from 'path';

const persistedQueries = fs.readFileSync(
  path.join(__dirname, '..', '..', 'tvhelper-app', 'persisted-queries.json'),
  'utf-8',
);

fs.writeFileSync(
  path.join(__dirname, '..', 'persisted-queries.json'),
  persistedQueries,
);
