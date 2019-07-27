// @flow

import { generateTestsFromFixtures } from '@kiwicom/test-utils';

import executeTestQuery from '../../../common/services/executeTestQuery';

jest.mock('../../../common/db/models/StoredOperation', () => ({
  addOperations: jest.fn(input => Promise.resolve(input)),
}));

generateTestsFromFixtures(`${__dirname}/__fixtures__`, input => executeTestQuery(input));
