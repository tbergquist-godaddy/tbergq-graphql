// @flow

import fetch from 'node-fetch';
import { graphql } from '../../../common/services/TestingTools';

it('works', async () => {
  fetch.mockResponse(
    JSON.stringify([
      {
        show: {
          id: 1,
          name: 'lol',
          status: 'status',
          premiered: '2018-11-11',
          rating: { average: 1.1 },
        },
      },
    ]),
  );
  const query = `
    query($query: String!) {
      searchTvShow(query: $query) {
        edges {
          node {
            id
            name
            status
            premiered
            rating
          }
        }
      }
    }
  `;
  expect(await graphql(query, { query: 'lol' })).toMatchSnapshot();
});
