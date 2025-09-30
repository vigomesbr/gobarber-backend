import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

interface IValidationSchemas {
  body?: z.Schema;
  query?: z.Schema;
  params?: z.Schema;
}

export function validateRequest(schemas: IValidationSchemas) {
  return async (request: Request, response: Response, next: NextFunction) => {
    response.locals.validated = {};
    
    try {
      if (schemas.body) {
        response.locals.validated.body = await schemas.body.parseAsync(request.body);
      }
      if (schemas.query) {
        response.locals.validated.query = await schemas.query.parseAsync(request.query);
      }
      if (schemas.params) {
        response.locals.validated.params = await schemas.params.parseAsync(request.params);
      }
      
      return next();
    } catch (error) {
      return next(error);
    }
  };
}