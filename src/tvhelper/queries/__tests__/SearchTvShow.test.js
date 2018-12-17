// @flow

import fetch from 'node-fetch';

import { graphql } from '../../../common/services/TestingTools';
import tvshow from '../../datasets/tvshow.json';

it('works', async () => {
  fetch.mockResponse(
    JSON.stringify([
      {
        show: tvshow,
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
            image {
              medium
              original
            }
          }
        }
      }
    }
  `;
  expect(await graphql(query, { query: 'lol' })).toMatchSnapshot();
});
