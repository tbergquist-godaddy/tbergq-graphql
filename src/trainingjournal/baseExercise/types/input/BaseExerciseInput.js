// @flow

import { GraphQLInputObjectType, GraphQLString, GraphQLNonNull } from 'graphql';

export type BaseExerciseInputType = {|
  +name: string,
  +videoLink?: string,
  +description?: string,
  +muscleGroup: string,
|};

export default new GraphQLInputObjectType({
  name: 'BaseExerciseInput',
  fields: {
    name: {
      type: GraphQLNonNull(GraphQLString),
    },
    videoLink: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
    muscleGroup: {
      type: GraphQLNonNull(GraphQLString),
    },
  },
});
