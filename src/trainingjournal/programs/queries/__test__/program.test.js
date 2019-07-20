// @flow

import { generateTestsFromFixtures } from '@kiwicom/test-utils';

import executeTestQuery from '../../../../common/services/executeTestQuery';
import Day from '../../datasets/day.json';

fetch.mockResponses([JSON.stringify(Day)]);

jest.mock('../../../db/ProgramModel.js', () => ({
  getProgram: () =>
    Promise.resolve({
      _id: 67,
      name: 'Getting back in 2 it',
      date: '2017-08-08T09:20:11Z',
    }),
}));

generateTestsFromFixtures(`${__dirname}/__fixtures__`, input =>
  executeTestQuery(input),
);
