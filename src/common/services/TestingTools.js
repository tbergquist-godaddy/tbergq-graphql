// @flow

import { graphql as originalGraphQL } from 'graphql';

import schema from '../../Schema';
import createContext from './GraphqlContext';

jest.mock('jsonwebtoken', () => ({
  verify: () => ({ id: '1', username: 'lol' }),
  sign: jest.fn(() => 'tokenIsSigned'),
}));

export const graphql = (
  query: string,
  variables: ?Object,
  token?: string,
): Promise<Object> =>
  originalGraphQL(schema, query, null, createContext(token), variables);
