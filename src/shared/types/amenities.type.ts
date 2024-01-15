import { TValueOf } from './value-of.type.js';

export const AMENITIES_TYPE = {
  Breakfast: 'Breakfast',
  'Air conditioning': 'Air conditioning',
  'Laptop friendly workspace': 'Laptop friendly workspace',
  'Baby seat': 'Baby seat',
  Washer: 'Washer',
  Towels: 'Towels',
  Fridge: 'Fridge',
} as const;

export type TAmenitiesType = TValueOf<typeof AMENITIES_TYPE>;
