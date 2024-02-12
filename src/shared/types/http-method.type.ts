import { HttpMethod } from '../const/index.js';
import { TValueOf } from './value-of.type.js';

export type THttpMethod = TValueOf<typeof HttpMethod>;
