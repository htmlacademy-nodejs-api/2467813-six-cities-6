import { NextFunction, Request, Response } from 'express';
import { IMiddleware, THttpMethod } from './index.js';

export interface IRoute {
  path: string;
  method: THttpMethod;
  handler: (req: Request, res: Response, next: NextFunction) => void;
  middlewares?: IMiddleware[];
}
