import { AMENITIES_TYPE } from '../const/index.js';
import { TValueOf } from './value-of.type.js';

export type TAmenitiesType = TValueOf<typeof AMENITIES_TYPE>;
