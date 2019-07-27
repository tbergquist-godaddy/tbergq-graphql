// @flow

import { GraphQLObjectType, GraphQLID } from 'graphql';
import { toGlobalId } from 'graphql-relay';

import type { Cast } from '../dataloaders/SearchTvShowLoader';
import Person from './Person';

export default new GraphQLObjectType({
  name: 'Cast',
  fields: {
    id: {
      type: GraphQLID,
      resolve: ({ person, character }: Cast) => toGlobalId('cast', `${person.id}:${character.id}`),
    },
    person: {
      type: Person,
      resolve: ({ person }: Cast) => ({ ...person, type: 'person' }),
    },
    character: {
      type: Person,
      resolve: ({ character }: Cast) => ({ ...character, type: 'character' }),
    },
  },
});
