// @flow

import { GraphQLNonNull, GraphQLList } from 'graphql';

import CreatedStoredOperation from '../types/output/CreateStoredOperation';
import StoredOperationInput from '../types/input/StoredOperationInput';
import type { StoredOperationType } from '../StoredOperation';
import { addOperations } from '../../common/db/models/StoredOperation';

type Args = {
  storedOperations: $ReadOnlyArray<StoredOperationType>,
  ...
};

export default {
  type: CreatedStoredOperation,
  args: {
    storedOperations: {
      type: GraphQLNonNull(GraphQLList(GraphQLNonNull(StoredOperationInput))),
    },
  },
  resolve: async (_: mixed, args: Args) => {
    const addedOperations = await addOperations(args.storedOperations);

    return {
      createdOperations: addedOperations ?? [],
    };
  },
};
