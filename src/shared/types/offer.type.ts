import { TAmenitiesType } from './amenities.type.js';
import { TCityType } from './city.type.js';
import { TCoordinate } from './coordinate.type.js';
import { THouseType } from './house.type.js';
import { TUser } from './user.type.js';

export type TOffer = {
  title: string;
  description: string;
  publicationDate: Date;
  city: TCityType;
  previewImage: string;
  listImages: string[];
  isPremium: boolean;
  isFavorite: boolean;
  rating: number;
  houseType: THouseType;
  rooms: number;
  guests: number;
  rentalCost: number;
  amenities: TAmenitiesType[];
  author: TUser;
  coordinates: TCoordinate;
};
