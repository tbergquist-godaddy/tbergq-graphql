// @flow

import { toGlobalId } from 'graphql-relay';

import { graphql } from '../../../common/services/TestingTools';
import episode from '../../datasets/episode.json';

const query = `
  query episode($id: ID!) {
    episode(id: $id) {
      id
      name
      image {
        medium
        original
      }
      season
      number
      seasonAndNumber
      airdate
      summary(stripTags: false)
    }
  }
  `;

it('works', async () => {
  // $FlowFixMe
  fetch.mockResponse(JSON.stringify(episode));
  expect(await graphql(query, { id: toGlobalId('episode', '1471697') })).toMatchSnapshot();
});
