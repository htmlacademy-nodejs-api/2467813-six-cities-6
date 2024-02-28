import { inject, injectable } from 'inversify';
import { IExceptionFilter } from '../index.js';
import { Component } from '../../../const/index.js';
import { ILogger } from '../../logger/index.js';
import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createErrorObject } from '../../../utils/index.js';
import { ApplicationError } from '../const/index.js';

@injectable()
export class AppExceptionFilter implements IExceptionFilter {
  constructor(@inject(Component.Logger) private readonly logger: ILogger) {
    this.logger.info('Register AppExceptionFilter');
  }

  public catch(error: Error, _req: Request, res: Response, _next: NextFunction): void {
    this.logger.error(error.message, error);
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(createErrorObject(ApplicationError.ServiceError, error.message));
  }
}
