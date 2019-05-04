// @flow

import { generateTestsFromFixtures } from '@kiwicom/test-utils';

import executeTestQuery from '../../../../common/services/executeTestQuery';
import createExercise from '../../datasets/createExercise.json';

fetch.mockResponses([JSON.stringify(createExercise)]);

generateTestsFromFixtures(`${__dirname}/__fixtures__`, input =>
  executeTestQuery(input),
);
