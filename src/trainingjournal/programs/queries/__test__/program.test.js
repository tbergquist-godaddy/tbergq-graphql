// @flow

import { generateTestsFromFixtures } from '@kiwicom/test-utils';

import executeTestQuery from '../../../../common/services/executeTestQuery';
import Program from '../../datasets/program.json';
import Day from '../../datasets/day.json';

fetch.mockResponses([JSON.stringify(Day)], [JSON.stringify(Program)]);

generateTestsFromFixtures(`${__dirname}/__fixtures__`, input =>
  executeTestQuery(input),
);
