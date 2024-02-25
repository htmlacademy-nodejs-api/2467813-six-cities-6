import { inject, injectable } from 'inversify';
import { IExceptionFilter } from '../../../libs/rest/index.js';
import { Component } from '../../../const/index.js';
import { ILogger } from '../../../libs/logger/index.js';
import { NextFunction, Request, Response } from 'express';
import { BaseUserException } from './index.js';

@injectable()
export class AuthExceptionFilter implements IExceptionFilter {
  constructor(@inject(Component.Logger) private readonly logger: ILogger) {
    this.logger.info('Register AuthExceptionFilter');
  }

  public catch(error: unknown, _req: Request, res: Response, next: NextFunction): void {
    if (!(error instanceof BaseUserException)) {
      return next(error);
    }

    this.logger.error(`[AuthModule] ${error.message}`, error);
    res.status(error.httpStatusCode).json({
      type: 'AUTHORIZATION',
      error: error.message,
    });
  }
}
