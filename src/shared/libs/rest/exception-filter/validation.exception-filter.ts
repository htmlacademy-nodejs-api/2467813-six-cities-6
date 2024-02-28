import { inject, injectable } from 'inversify';
import { IExceptionFilter, ValidationError } from '../index.js';
import { Component } from '../../../const/index.js';
import { ILogger } from '../../logger/index.js';
import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import { createErrorObject } from '../../../utils/index.js';
import { ApplicationError } from '../const/index.js';

@injectable()
export class ValidationExceptionFilter implements IExceptionFilter {
  constructor(@inject(Component.Logger) private readonly logger: ILogger) {
    this.logger.info('Register ValidationExceptionFilter');
  }

  public catch(error: unknown, _req: Request, res: Response, next: NextFunction): void {
    if (!(error instanceof ValidationError)) {
      return next(error);
    }

    this.logger.error(`[ValidationException]: ${error.message}`, error);

    error.details.forEach((errorField) => this.logger.warn(`[${errorField.property}] — ${errorField.messages}`));

    res
      .status(StatusCodes.BAD_REQUEST)
      .json(createErrorObject(ApplicationError.ValidationError, error.message, error.details));
  }
}
