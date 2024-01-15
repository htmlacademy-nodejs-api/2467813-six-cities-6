import { TValueOf } from './value-of.type.js';

export const HOUSE_TYPE = {
  apartment: 'apartment',
  house: 'house',
  room: 'room',
  hotel: 'hotel',
} as const;

export type THouseType = TValueOf<typeof HOUSE_TYPE>;
