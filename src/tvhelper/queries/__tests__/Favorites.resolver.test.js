// @flow

import Favorites from '../Favorites';

const { resolve } = Favorites;

const ancestor = null;
const user = {
  id: '1',
};
const dataLoader = {
  tvhelper: {
    favorites: {
      load: async () =>
        Promise.resolve([
          { serieId: 1 },
          { serieId: 2 },
          { serieId: 3 },
          { serieId: 4 },
        ]),
    },
    tvDetail: {
      loadMany: async () =>
        Promise.resolve([
          {
            name: 'Game of Thrones',
            status: 'running',
            _embedded: {
              nextepisode: { airdate: new Date('2018-01-01') },
              previousepisode: { airdate: new Date('2018-01-01') },
            },
          },
          {
            name: 'Animal kingdom',
            status: 'ended',
            _embedded: {
              nextepisode: { airdate: new Date('2018-12-01') },
              previousepisode: { airdate: new Date('2018-12-01') },
            },
          },
          {
            name: 'The 100',
            status: 'in development',
            _embedded: {
              nextepisode: { airdate: new Date('2018-12-05') },
              previousepisode: { airdate: new Date('2018-12-05') },
            },
          },
          {
            name: 'Elite',
            status: 'running',
            _embedded: {
              nextepisode: { airdate: new Date('2017-12-01') },
              previousepisode: { airdate: new Date('2017-12-01') },
            },
          },
        ]),
    },
  },
};
const context = {
  user,
  dataLoader,
};

const ascending = 'ascending';
const descending = 'descending';

it('sorts by name ascending', async () => {
  expect(
    await resolve(
      ancestor,
      { options: { sortDirection: ascending, sortBy: 'name' } },
      // $FlowExpectedError: Passing just dataLoaders needed to test
      context,
    ),
  ).toMatchSnapshot();
});

it('sorts by name descending', async () => {
  expect(
    await resolve(
      ancestor,
      { options: { sortDirection: descending, sortBy: 'name' } },
      context,
    ),
  ).toMatchSnapshot();
});

it('sorts by status ascending', async () => {
  expect(
    await resolve(
      ancestor,
      { options: { sortDirection: ascending, sortBy: 'status' } },
      context,
    ),
  ).toMatchSnapshot();
});

it('sorts by status descending', async () => {
  expect(
    await resolve(
      ancestor,
      { options: { sortDirection: descending, sortBy: 'status' } },
      context,
    ),
  ).toMatchSnapshot();
});

it('sorts by nextepisode ascending', async () => {
  expect(
    await resolve(
      ancestor,
      {
        options: {
          sortDirection: ascending,
          sortBy: '_embedded.nextepisode.airdate',
        },
      },
      context,
    ),
  ).toMatchSnapshot();
});

it('sorts by nextepisode descending', async () => {
  expect(
    await resolve(
      ancestor,
      {
        options: {
          sortDirection: descending,
          sortBy: '_embedded.nextepisode.airdate',
        },
      },
      context,
    ),
  ).toMatchSnapshot();
});

it('sorts by previousepisode ascending', async () => {
  expect(
    await resolve(
      ancestor,
      {
        options: {
          sortDirection: ascending,
          sortBy: '_embedded.previousepisode.airdate',
        },
      },
      context,
    ),
  ).toMatchSnapshot();
});

it('sorts by previousepisode descending', async () => {
  expect(
    await resolve(
      ancestor,
      {
        options: {
          sortDirection: descending,
          sortBy: '_embedded.previousepisode.airdate',
        },
      },
      context,
    ),
  ).toMatchSnapshot();
});
