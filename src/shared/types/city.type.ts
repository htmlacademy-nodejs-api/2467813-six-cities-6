import { TValueOf } from './value-of.type.js';

export const CITY_TYPE = {
  Paris: 'Paris',
  Cologne: 'Cologne',
  Brussels: 'Brussels',
  Amsterdam: 'Amsterdam',
  Hamburg: 'Hamburg',
  Dusseldorf: 'Dusseldorf',
} as const;

export type TCityType = TValueOf<typeof CITY_TYPE>;
