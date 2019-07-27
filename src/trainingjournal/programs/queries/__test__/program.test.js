// @flow

import { generateTestsFromFixtures } from '@kiwicom/test-utils';

import executeTestQuery from '../../../../common/services/executeTestQuery';

jest.mock('../../../db/ProgramModel.js', () => ({
  getProgram: () =>
    Promise.resolve({
      _id: 67,
      name: 'Getting back in 2 it',
      date: '2017-08-08T09:20:11Z',
    }),
}));

jest.mock(
  '../../repositories/DayRepository.js',
  () =>
    class DayRepository {
      getDay = () =>
        Promise.resolve({
          _id: '345',
          name: 'Day 1',
        });
    },
);

generateTestsFromFixtures(`${__dirname}/__fixtures__`, input =>
  executeTestQuery(input),
);
