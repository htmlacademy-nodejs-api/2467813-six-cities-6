export const OFFER_CONTROLLER = 'OfferController';

export const OfferCount = {
  common: 60,
  premium: 3,
} as const;

export const CreateOfferValidationMessage = {
  title: {
    invalidFormat: 'title is required',
    minLength: 'Min length for title path is 10',
    maxLength: 'Max length for title path is 100',
  },
  description: {
    invalidFormat: 'description is required',
    minLength: 'Min length for description path is 20',
    maxLength: 'Max length for description path is 1024',
  },
  city: {
    invalidFormat: 'type must be Paris, Cologne, Brussels, Amsterdam, Hamburg or Dusseldorf',
  },
  previewImage: {
    isUrl: 'previewImage must be a valid URL',
    matches: 'The image must include an extension.jpg or .png',
  },
  listImages: {
    invalidFormat: 'Field listImages must be an array',
    ArrayMinSize: 'listImages must contain exactly 6 images',
    ArrayMaxSize: 'listImages must contain exactly 6 images',
  },
  isPremium: {
    invalidFormat: 'isPremium must be an boolean',
    invalid: '',
  },
  houseType: {
    invalidFormat: 'type must be apartment, house, room or hotel',
  },
  rooms: {
    invalidFormat: 'rooms must be an integer',
    minValue: 'Min length for rooms path is 1',
    maxValue: 'Max length for rooms path is 8',
  },
  guests: {
    invalidFormat: 'guests must be an integer',
    minValue: 'Min length for rooms path is 1',
    maxValue: 'Max length for guests path is 10',
  },
  rentalCost: {
    invalidFormat: 'rentalCost must be an integer',
    minValue: 'Min length for rentalCost path is 100',
    maxValue: 'Max length for rentalCost path is 100000',
  },
  amenities: {
    invalidFormat:
      'Field categories must be an array and type must be Breakfast, Air conditioning, Laptop friendly workspace, Baby seat, Washer, Towels or Fridge',
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
