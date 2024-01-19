import { TAmenitiesType } from './amenities.type.js';
import { TCityType } from './city.type.js';
import { TCoordinate } from './coordinate.type.js';
import { THouseType } from './house.type.js';
import { TRatingType } from './rating.type.js';
import { TUserData } from './user.type.js';

export type TOffer = {
  title: string;
  description: string;
  publicationDate: Date;
  city: TCityType;
  previewImage: string;
  listImages: string[]; // Список ссылок на фотографии жилья. Всегда 6 фотографий
  isPremium: boolean;
  isFavorite: boolean;
  rating: TRatingType; // Число от 1 до 5 с одним знаком после запятой
  houseType: THouseType; // Тип жилья
  rooms: number;
  guests: number;
  rentalCost: number;
  amenities: TAmenitiesType[]; // Список удобств
  author: TUserData;
  coordinates: TCoordinate;
  // FIXME: ПОПРАВИТЬ КОММЕНТАРИЙ
  // Количество комментариев. Рассчитывается автоматически;
};
