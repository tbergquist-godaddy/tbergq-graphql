// @flow

import { GraphQLObjectType } from 'graphql';
import Test from './queries/TestQuery';

export default new GraphQLObjectType({
  name: 'RootQuery',
  description: 'Root Query',
  fields: {
    test: Test,
  },
});
