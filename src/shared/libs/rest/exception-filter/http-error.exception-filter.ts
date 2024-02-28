import { inject, injectable } from 'inversify';
import { HttpError, IExceptionFilter } from '../index.js';
import { Component } from '../../../const/index.js';
import { ILogger } from '../../logger/index.js';
import { Request, Response, NextFunction } from 'express';
import { createErrorObject } from '../../../utils/index.js';
import { ApplicationError } from '../const/index.js';

@injectable()
export class HttpErrorExceptionFilter implements IExceptionFilter {
  constructor(@inject(Component.Logger) private readonly logger: ILogger) {
    this.logger.info('Register HttpErrorExceptionFilter');
  }

  public catch(error: unknown, req: Request, res: Response, next: NextFunction): void {
    if (!(error instanceof HttpError)) {
      return next(error);
    }

    this.logger.error(`[HttpErrorException]: ${req.path} # ${error.message}`, error);
    res.status(error.httpStatusCode).json(createErrorObject(ApplicationError.CommonError, error.message));
  }
}
