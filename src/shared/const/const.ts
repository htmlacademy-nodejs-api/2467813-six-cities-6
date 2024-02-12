export const DECIMAL_SYSTEM = 10;
export const TRUE = 'true';
export const FUNCTION = 'function';
export const LOG_FILE_PATH = 'logs/rest.log';

export const Component = {
  RestApplication: Symbol.for('RestApplication'),
  Logger: Symbol.for('Logger'),
  Config: Symbol.for('Config'),
  DatabaseClient: Symbol.for('DatabaseClient'),
  UserService: Symbol.for('UserService'),
  UserModel: Symbol.for('UserModel'),
  OfferService: Symbol.for('OfferService'),
  OfferModel: Symbol.for('OfferModel'),
  CommentService: Symbol.for('CommentService'),
  CommentModel: Symbol.for('CommentModel'),
} as const;

export const HttpMethod = {
  Get: 'get',
  Post: 'post',
  Delete: 'delete',
  Patch: 'patch',
  Put: 'put',
} as const;

export const RouteApp = {} as const;

export const AmenitiesType = {
  Breakfast: 'Breakfast',
  'Air conditioning': 'Air conditioning',
  'Laptop friendly workspace': 'Laptop friendly workspace',
  'Baby seat': 'Baby seat',
  Washer: 'Washer',
  Towels: 'Towels',
  Fridge: 'Fridge',
} as const;

export const CityType = {
  Paris: 'Paris',
  Cologne: 'Cologne',
  Brussels: 'Brussels',
  Amsterdam: 'Amsterdam',
  Hamburg: 'Hamburg',
  Dusseldorf: 'Dusseldorf',
} as const;

export const HouseType = {
  apartment: 'apartment',
  house: 'house',
  room: 'room',
  hotel: 'hotel',
} as const;

export const UserType = {
  simple: 'обычный',
  pro: 'pro',
} as const;

export const GeographicalCoordinates = {
  Paris: '48.85661;2.351499',
  Cologne: '50.938361;6.959974',
  Brussels: '50.846557;4.351697',
  Amsterdam: '52.370216;4.895168',
  Hamburg: '53.550341;10.000654',
  Dusseldorf: '51.225402;6.776314',
} as const;

export const ListCities = [
  {
    name: CityType.Paris,
    coordinates: GeographicalCoordinates.Paris,
  },
  {
    name: CityType.Cologne,
    coordinates: GeographicalCoordinates.Cologne,
  },
  {
    name: CityType.Brussels,
    coordinates: GeographicalCoordinates.Brussels,
  },
  {
    name: CityType.Hamburg,
    coordinates: GeographicalCoordinates.Hamburg,
  },
  {
    name: CityType.Amsterdam,
    coordinates: GeographicalCoordinates.Amsterdam,
  },
  {
    name: CityType.Dusseldorf,
    coordinates: GeographicalCoordinates.Dusseldorf,
  },
] as const;

export const SortTypeMongoDB = {
  Down: -1,
  Up: 1,
} as const;
