import { TTokenPayload } from '../index.js';

export function isTokenPayload(payload: unknown): payload is TTokenPayload {
  return (
    typeof payload === 'object' &&
    payload !== null &&
    'email' in payload &&
    typeof payload.email === 'string' &&
    'name' in payload &&
    typeof payload.name === 'string' &&
    'id' in payload &&
    typeof payload.id === 'string'
  );
}
