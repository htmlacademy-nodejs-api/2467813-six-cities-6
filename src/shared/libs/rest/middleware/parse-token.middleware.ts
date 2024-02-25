import { NextFunction, Request, Response } from 'express';
import { HttpError, IMiddleware } from '../index.js';
import { jwtVerify } from 'jose';
import { createSecretKey } from 'node:crypto';
import { isTokenPayload } from '../../../modules/auth/index.js';
import { StatusCodes } from 'http-status-codes';

export class ParseTokenMiddleware implements IMiddleware {
  constructor(private readonly jwtSecret: string) {}

  public async execute(req: Request, _res: Response, next: NextFunction): Promise<void> {
    const authorizationHeader = req.headers?.authorization?.split(' ');
    if (!authorizationHeader) {
      return next();
    }

    const [, token] = authorizationHeader;

    try {
      const { payload } = await jwtVerify(token, createSecretKey(this.jwtSecret, 'utf-8'));

      if (isTokenPayload(payload)) {
        req.tokenPayload = { ...payload };
        return next();
      } else {
        throw new Error('Bad token');
      }
    } catch {
      return next(new HttpError(StatusCodes.UNAUTHORIZED, 'Invalid token', 'AuthenticateMiddleware'));
    }
  }
}
