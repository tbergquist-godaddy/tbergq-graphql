// @flow

import { generateTestsFromFixtures } from '@kiwicom/test-utils';

import executeTestQuery from '../../../../common/services/executeTestQuery';

jest.mock(
  '../../repositories/DayRepository',
  () =>
    class DayRepository {
      addExercise = () =>
        Promise.resolve({
          _id: '123',
          sets: 'set',
          reps: 'rep',
          breakTime: '2',
        });
    },
);

generateTestsFromFixtures(`${__dirname}/__fixtures__`, input =>
  executeTestQuery(input),
);
