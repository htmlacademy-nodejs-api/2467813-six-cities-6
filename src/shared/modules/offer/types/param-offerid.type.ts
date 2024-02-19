import { ParamsDictionary } from 'express-serve-static-core';

export type TParamOfferId =
  | {
      id: string;
    }
  | ParamsDictionary;
