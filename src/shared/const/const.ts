export const DECIMAL_SYSTEM = 10;
export const TRUE = 'true';
export const FUNCTION = 'function';
export const LOG_FILE_PATH = 'logs/rest.log';
export const IMAGE_REX_EXP = /\.(jpg|png)(\?.*)?$/i;

export const StaticPath = {
  Upload: '/upload',
  Files: '/static',
} as const;

export const Path = {
  Comments: 'comments',
  Favorite: 'favorite',
  Register: 'register',
  Login: 'login',
  Logout: 'logout',
} as const;

export const AppRoutes = {
  Users: 'users',
  Offers: 'offers',
  Comments: 'comments',
} as const;

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
  ExceptionFilter: Symbol.for('ExceptionFilter'),
  UserController: Symbol.for('UserController'),
  OfferController: Symbol.for('OfferController'),
  CommentController: Symbol.for('CommentController'),
  AuthService: Symbol.for('AuthService'),
  AuthExceptionFilter: Symbol.for('AuthExceptionFilter'),
  HttpExceptionFilter: Symbol.for('HttpExceptionFilter'),
  ValidationExceptionFilter: Symbol.for('ValidationExceptionFilter'),
  PathTransformer: Symbol.for('PathTransformer'),
} as const;

export const HttpMethod = {
  Get: 'get',
  Post: 'post',
  Delete: 'delete',
  Patch: 'patch',
  Put: 'put',
} as const;

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

export const SortTypeMongoDB = {
  Down: -1,
  Up: 1,
} as const;

export const Retry = {
  count: 5,
  timeout: 1000,
} as const;

export const Rating = {
  Min: 1,
  Max: 5,
} as const;

export const Rooms = {
  Min: 1,
  Max: 8,
} as const;

export const Guests = {
  Min: 1,
  Max: 10,
} as const;

export const Price = {
  Min: 100,
  Max: 100_000,
} as const;
