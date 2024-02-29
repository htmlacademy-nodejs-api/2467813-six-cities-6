import { AmenitiesType, CityType, Guests, HouseType, Price, Rooms } from '../../../const/index.js';

export const OFFER_CONTROLLER = 'OfferController';
export const LIST_IMAGES_SIZE = 6;

export const OfferCount = {
  common: 60,
  premium: 3,
} as const;

export const Title = {
  Min: 10,
  Max: 100,
} as const;

export const Description = {
  Min: 20,
  Max: 1024,
} as const;

export const CreateOfferValidationMessage = {
  title: {
    invalidFormat: 'title is required',
    minLength: `Min length for title path is ${Title.Min}`,
    maxLength: `Max length for title path is ${Title.Max}`,
  },
  description: {
    invalidFormat: 'description is required',
    minLength: `Min length for description path is ${Description.Min}`,
    maxLength: `Max length for description path is ${Description.Max}`,
  },
  city: {
    invalidFormat: `type must be ${CityType.Paris}, ${CityType.Cologne}, ${CityType.Brussels}, ${CityType.Amsterdam}, ${CityType.Hamburg} or ${CityType.Dusseldorf}`,
  },
  previewImage: {
    isUrl: 'previewImage must be a valid URL',
    matches: 'The image must include an extension.jpg or .png',
  },
  listImages: {
    invalidFormat: 'Field listImages must be an array',
    ArrayMinSize: `listImages must contain exactly ${LIST_IMAGES_SIZE} images`,
    ArrayMaxSize: `listImages must contain exactly ${LIST_IMAGES_SIZE} images`,
  },
  isPremium: {
    invalidFormat: 'isPremium must be an boolean',
    invalid: '',
  },
  houseType: {
    invalidFormat: `type must be ${HouseType.apartment}, ${HouseType.house}, ${HouseType.room} or ${HouseType.hotel}`,
  },
  rooms: {
    invalidFormat: 'rooms must be an integer',
    minValue: `Min length for rooms path is ${Rooms.Min}`,
    maxValue: `Max length for rooms path is ${Rooms.Max}`,
  },
  guests: {
    invalidFormat: 'guests must be an integer',
    minValue: `Min length for rooms path is ${Guests.Min}`,
    maxValue: `Max length for guests path is ${Guests.Max}`,
  },
  rentalCost: {
    invalidFormat: 'rentalCost must be an integer',
    minValue: `Min length for rentalCost path is ${Price.Min}`,
    maxValue: `Max length for rentalCost path is ${Price.Max}`,
  },
  amenities: {
    invalidFormat: `Field categories must be an array and type must be ${AmenitiesType.Breakfast}, ${AmenitiesType['Air conditioning']}, ${AmenitiesType['Laptop friendly workspace']}, ${AmenitiesType['Baby seat']}, ${AmenitiesType.Washer}, ${AmenitiesType.Towels} or ${AmenitiesType.Fridge}`,
  },
  latitude: {
    invalidFormat: 'latitude must be an integer',
  },
  longitude: {
    invalidFormat: 'longitude must be an integer',
  },
  userId: {
    invalidId: 'userId field must be a valid id',
  },
} as const;
