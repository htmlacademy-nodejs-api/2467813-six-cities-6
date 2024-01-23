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

export const USER_TYPE = {
  simple: 'обычный',
  pro: 'pro',
} as const;

export const GEOGRAPHICAL_COORDINATES = {
  Paris: '48.85661;2.351499',
  Cologne: '50.938361;6.959974',
  Brussels: '50.846557;4.351697',
  Amsterdam: '52.370216;4.895168',
  Hamburg: '53.550341;10.000654',
  Dusseldorf: '51.225402;6.776314',
};

export const LIST_CITIES = [
  {
    name: CITY_TYPE.Paris,
    coordinates: GEOGRAPHICAL_COORDINATES.Paris,
  },
  {
    name: CITY_TYPE.Cologne,
    coordinates: GEOGRAPHICAL_COORDINATES.Cologne,
  },
  {
    name: CITY_TYPE.Brussels,
    coordinates: GEOGRAPHICAL_COORDINATES.Brussels,
  },
  {
    name: CITY_TYPE.Hamburg,
    coordinates: GEOGRAPHICAL_COORDINATES.Hamburg,
  },
  {
    name: CITY_TYPE.Amsterdam,
    coordinates: GEOGRAPHICAL_COORDINATES.Amsterdam,
  },
  {
    name: CITY_TYPE.Dusseldorf,
    coordinates: GEOGRAPHICAL_COORDINATES.Dusseldorf,
  },
] as const;
