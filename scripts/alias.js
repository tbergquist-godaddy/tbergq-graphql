// @flow

import { execSync } from 'child_process';
import path from 'path';

if (process.argv.length !== 3) {
  throw Error('Please pass one argument');
}

// $FlowFixMe
const deployName = process.argv[2];

execSync(`now alias ${deployName} tbergq-graphql.now.sh`, {
  cwd: path.join(__dirname, '..'),
  stdio: 'inherit',
});
