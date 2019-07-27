// @flow

import { toGlobalId } from 'graphql-relay';

import { graphql } from '../../../common/services/TestingTools';
import tvshow from '../../datasets/tvshow.json';

it('works', async () => {
  // $FlowFixMe
  fetch.mockResponse(JSON.stringify(tvshow));
  const query = `
  query detail($id: ID!) {
    tvShowDetail(id: $id) {
      id
      name
      status
      premiered
      rating
      image {
        original
        medium
      }
      summary
    }
  }
  `;
  expect(await graphql(query, { id: toGlobalId('test', '123') })).toMatchSnapshot();
});
