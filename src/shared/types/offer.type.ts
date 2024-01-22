import { TAmenitiesType } from './amenities.type.js';
import { TCityType } from './city.type.js';
import { TCoordinate } from './coordinate.type.js';
import { THouseType } from './house.type.js';
import { TUserData } from './user.type.js';

export type TOffer = {
  title: string; // Обязательное. Мин. длин 10 символов, макс. длина 100;
  description: string; // Обязательное. Мин. длина 20 символов, макс. длина 1024 символа;
  publicationDate: Date; // Обязательное.
  city: TCityType;
  previewImage: string; // Обязательное. Ссылка на изображение, которое используется в качестве превью;
  listImages: string[]; // Обязательное. Список ссылок на фотографии жилья. Всегда 6 фотографий;
  isPremium: boolean; // Обязательное. Признак премиальности предложения;
  isFavorite: boolean; // Обязательное. Признак того, что предложение принадлежит списку избранных предложений пользователя;
  rating: number; // Обязательное. Число от 1 до 5. Допускаются числа с запятой (1 знак после запятой);
  houseType: THouseType; // Тип жилья
  rooms: number; // Обязательное. Мин. 1, Макс. 8;
  guests: number; // Обязательное. Мин. 1, Макс. 10;
  rentalCost: number; // Обязательное. Мин. 100, Макс. 100 000;
  amenities: TAmenitiesType[]; // Список удобств
  author: TUserData;
  coordinates: TCoordinate;
  // FIXME: ПОПРАВИТЬ КОММЕНТАРИЙ
  // Количество комментариев. Рассчитывается автоматически;
};
