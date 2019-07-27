// @flow

import { GraphQLInputObjectType, GraphQLString, GraphQLID, GraphQLNonNull } from 'graphql';

export type ExerciseInputType = {|
  +breakTime: string,
  +dayId: string,
  +description: ?string,
  +reps: string,
  +sets: string,
  +baseExerciseId: string,
|};

export default new GraphQLInputObjectType({
  name: 'ExerciseInput',
  fields: {
    breakTime: {
      type: GraphQLNonNull(GraphQLString),
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
    sets: {
      type: GraphQLNonNull(GraphQLString),
    },
    baseExerciseId: {
      type: GraphQLNonNull(GraphQLID),
    },
  },
});
