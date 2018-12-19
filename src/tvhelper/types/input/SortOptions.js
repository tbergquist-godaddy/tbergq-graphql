// @flow

import { GraphQLInputObjectType, GraphQLEnumType } from 'graphql';

const SortDirection = new GraphQLEnumType({
  name: 'SortDirection',
  values: {
    ASC: { value: 'ascending' },
    DESC: { value: 'descending' },
  },
});

const SortBy = new GraphQLEnumType({
  name: 'SortBy',
  values: {
    NAME: { value: 'name' },
    NEXT_EPISODE: { value: '_embedded.nextepisode.airdate' },
    PREVIOUS_EPISODE: { value: '_embedded.previousepisode.airdate' },
    STATUS: { value: 'status' },
  },
});
export default new GraphQLInputObjectType({
  name: 'SortOptions',
  fields: {
    sortDirection: {
      type: SortDirection,
      defaultValue: 'ascending',
    },
    sortBy: {
      type: SortBy,
      defaultValue: 'name',
    },
  },
});
