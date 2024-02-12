import { NextFunction, Request, Response } from 'express';
import { THttpMethod } from '../../types/index.js';

export interface IRoute {
  path: string;
  method: THttpMethod;
  handler: (req: Request, res: Response, next: NextFunction) => void;
}
