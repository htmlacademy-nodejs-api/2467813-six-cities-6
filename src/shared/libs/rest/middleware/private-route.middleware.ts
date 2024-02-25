import { NextFunction, Request, Response } from 'express';
import { HttpError, IMiddleware } from '../index.js';
import { StatusCodes } from 'http-status-codes';

export class PrivateRouteMiddleware implements IMiddleware {
  public async execute({ tokenPayload }: Request, _res: Response, next: NextFunction): Promise<void> {
    if (!tokenPayload) {
      throw new HttpError(StatusCodes.UNAUTHORIZED, 'Unauthorized', 'PrivateRouteMiddleware');
    }

    return next();
  }
}
