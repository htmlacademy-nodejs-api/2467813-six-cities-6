import { TValueOf } from './value-of.type.js';

export const RATING_TYPE = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
} as const;

export type TRatingType = TValueOf<typeof RATING_TYPE>;
