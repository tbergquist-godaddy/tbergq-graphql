// @flow

import { graphql as originalGraphQL } from 'graphql';
import schema from '../../Schema';
import createContext from './GraphqlContext';

export const graphql = async (
  query: string,
  variables: ?Object,
): Promise<Object> =>
  originalGraphQL(schema, query, null, createContext(), variables);
