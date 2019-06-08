// @flow

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

it('works', async () => {
  fetch.mockResponses([JSON.stringify(tvshow)], [JSON.stringify(tvshow2)]);
  expect(
    // $FlowExpectedError: this is ok
    await graphql(query, {}, { user: { token: 'token', id: '5' } }),
  ).toMatchSnapshot();
});
