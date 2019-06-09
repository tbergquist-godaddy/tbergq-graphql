// @flow

import bodyParser from 'body-parser';
import type { $Request, $Response } from 'express';

import { getOperation } from '../common/db/models/StoredOperation';

const jsonParser = bodyParser.json();

export default function matchQueryMiddleware() {
  return (req: $Request, res: $Response, next: Function) => {
    return jsonParser(req, res, async () => {
      const { queryId } = req.body;
      if (queryId) {
        const persistedQuery = await getOperation(queryId);
        const query = persistedQuery?.text;

        if (query) {
          req.body.query = query;
        } else {
          throw new Error(
            `matchQueryMiddleware: can't find queryId: ${queryId}`,
          );
        }
      }
      next();
    });
  };
}
