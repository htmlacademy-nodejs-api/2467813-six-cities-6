import { RATING_TYPE } from '../const/index.js';
import { TValueOf } from './value-of.type.js';

export type TRatingType = TValueOf<typeof RATING_TYPE>;
