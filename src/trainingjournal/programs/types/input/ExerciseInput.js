// @flow

import {
  GraphQLInputObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
} from 'graphql';

export type ExerciseInputType = {|
  +breakTime: number,
  +dayId: string,
  +description: ?string,
  +reps: string,
  +set: string,
  +baseExerciseId: string,
|};

export default new GraphQLInputObjectType({
  name: 'ExerciseInput',
  fields: {
    breakTime: {
      type: GraphQLNonNull(GraphQLInt),
    },
    dayId: {
      type: GraphQLNonNull(GraphQLID),
    },
    description: {
      type: GraphQLString,
    },
    reps: {
      type: GraphQLNonNull(GraphQLString),
    },
    set: {
      type: GraphQLNonNull(GraphQLString),
    },
    baseExerciseId: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
});
