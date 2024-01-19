export const DECIMAL_SYSTEM = 10;
export const TRUE = 'true';

export const AMENITIES_TYPE = {
  Breakfast: 'Breakfast',
  'Air conditioning': 'Air conditioning',
  'Laptop friendly workspace': 'Laptop friendly workspace',
  'Baby seat': 'Baby seat',
  Washer: 'Washer',
  Towels: 'Towels',
  Fridge: 'Fridge',
} as const;

export const CITY_TYPE = {
  Paris: 'Paris',
  Cologne: 'Cologne',
  Brussels: 'Brussels',
  Amsterdam: 'Amsterdam',
  Hamburg: 'Hamburg',
  Dusseldorf: 'Dusseldorf',
} as const;

export const HOUSE_TYPE = {
  apartment: 'apartment',
  house: 'house',
  room: 'room',
  hotel: 'hotel',
} as const;

export const RATING_TYPE = {
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
} as const;

export const USER_TYPE = {
  simple: 'обычный',
  pro: 'pro',
} as const;
