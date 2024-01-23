import { DECIMAL_SYSTEM, TRUE } from '../const/index.js';
import { TAmenitiesType, TCityType, THouseType, TOffer, TUserData } from '../types/index.js';

export function createOffer(offerData: string): TOffer {
  const [
    title,
    description,
    publicationDate,
    city,
    previewImage,
    listImages,
    isPremium,
    isFavorite,
    rating,
    houseType,
    rooms,
    guests,
    rentalCost,
    amenities,
    name,
    email,
    avatarPath,
    userType,
    coordinate,
  ] = offerData.replace('\n', '').split('\t');

  const user = {
    name,
    email,
    avatarPath,
    userType,
  } as TUserData;

  const coordinates = {
    latitude: Number(coordinate.split(';')[0]),
    longitude: Number(coordinate.split(';')[1]),
  };

  return {
    title,
    description,
    publicationDate: new Date(publicationDate),
    city: city as TCityType,
    previewImage,
    listImages: listImages.split(';').map((el) => el.trim()),
    isPremium: isPremium === TRUE,
    isFavorite: isFavorite === TRUE,
    rating: Number.parseFloat(rating),
    houseType: houseType as THouseType,
    rooms: Number.parseInt(rooms, DECIMAL_SYSTEM),
    guests: Number.parseInt(guests, DECIMAL_SYSTEM),
    rentalCost: Number.parseInt(rentalCost, DECIMAL_SYSTEM),
    amenities: amenities.split(';') as TAmenitiesType[],
    author: user,
    coordinates,
  };
}
