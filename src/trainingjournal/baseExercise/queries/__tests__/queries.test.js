// @flow

import { generateTestsFromFixtures } from '@kiwicom/test-utils';

import executeTestQuery from '../../../../common/services/executeTestQuery';
import baseExercises from '../../datasets/baseExercises.json';

fetch.mockResponses([JSON.stringify(baseExercises)]);

generateTestsFromFixtures(`${__dirname}/__fixtures__`, input =>
  executeTestQuery(input),
);
