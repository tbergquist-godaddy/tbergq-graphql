// @flow

import fetch from 'node-fetch';

import { graphql } from '../../../common/services/TestingTools';
import tvshow from '../../datasets/tvshow.json';
import tvshow2 from '../../datasets/tvshow2.json';

jest.mock('../../db/models/FavoritesModel.js', () => ({
  findFavorites: () => Promise.resolve([{ serieId: 139 }, { serieId: 6 }]),
}));
const query = `
  query favorites {
    favorites {
      edges {
        node {
          id
          name
        }
      }
    }
  }
  `;

it('throws error when not loggend in', async () => {
  expect(await graphql(query)).toMatchSnapshot();
});

it('works', async () => {
  fetch.mockResponses([JSON.stringify(tvshow)], [JSON.stringify(tvshow2)]);
  expect(await graphql(query, {}, 'token')).toMatchSnapshot();
});
