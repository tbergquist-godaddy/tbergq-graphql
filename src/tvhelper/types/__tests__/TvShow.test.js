// @flow

import { toGlobalId } from 'graphql-relay';

import TvShow from '../TvShow';

const fields = TvShow.getFields();

const { resolve } = fields.isFavorite;

const ancestor = { id: 1 };
const args = null;

it('returns null when not logged in', async () => {
  expect(
    await resolve(ancestor, args, { user: null, dataLoader: {} }),
  ).toBeNull();
});

it('returns true when show is favorite', async () => {
  const user = {
    id: toGlobalId('user', '1'),
  };
  const dataLoader = {
    tvhelper: {
      favorite: {
        load: () => Promise.resolve({ userId: 1, serieId: 1 }),
      },
    },
  };
  const context = { user, dataLoader };
  expect(await resolve(ancestor, args, context)).toBe(true);
});

it('returns false when show is not favorite', async () => {
  const user = {
    id: toGlobalId('user', '1'),
  };
  const dataLoader = {
    tvhelper: {
      favorite: {
        load: () => Promise.resolve(null),
      },
    },
  };
  const context = { user, dataLoader };
  expect(await resolve(ancestor, args, context)).toBe(false);
});
