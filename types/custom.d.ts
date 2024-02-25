import { TTokenPayload } from '../src/shared/modules/auth/types/token-payload.type.js';

declare module 'express-serve-static-core' {
  export interface Request {
    tokenPayload: TTokenPayload;
  }
}
