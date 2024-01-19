import { CITY_TYPE } from '../const/index.js';
import { TValueOf } from './value-of.type.js';

export type TCityType = TValueOf<typeof CITY_TYPE>;
