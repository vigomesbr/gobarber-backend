import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { ParsedQs } from 'qs';
import { ParamsDictionary } from 'express-serve-static-core';
interface IValidationSchemas {
  body?: z.Schema;
  query?: z.Schema;
  params?: z.Schema;
}

export function validateRequest(schemas: IValidationSchemas) {
  return async (request: Request, response: Response, next: NextFunction) => {
    try {
      if (schemas.body) {
        request.body = await schemas.body.parseAsync(request.body);
      }
      if (schemas.query) {
        request.query = (await schemas.query.parseAsync(
          request.query,
        )) as ParsedQs;
      }
      if (schemas.params) {
        request.params = (await schemas.params.parseAsync(
          request.params,
        )) as ParamsDictionary;
      }

      return next();
    } catch (error) {
      return next(error);
    }
  };
}