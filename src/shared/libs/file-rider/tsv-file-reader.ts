import { TAmenitiesType, TCityType, THouseType, TRatingType, TUserData } from '../../types/index.js';
import { TOffer } from '../../types/offer.type.js';
import { IFileReader } from './file-reader.interface.js';
import { readFileSync } from 'node:fs';

export class TSVFileReader implements IFileReader {
  private rawData = '';

  constructor(private readonly filename: string) {}

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf-8' });
  }

  public toArray(): TOffer[] {
    if (!this.rawData) {
      throw new Error('File was not read');
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim().length > 0)
      .map((line) => line.split('\t'))
      .map(
        ([
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
        ]) => ({
          title,
          description,
          publicationDate: new Date(publicationDate),
          city: city as TCityType,
          previewImage,
          listImages: listImages.split(',').map((el) => el.trim()),
          isPremium: isPremium === 'true',
          isFavorite: isFavorite === 'true',
          rating: Number.parseInt(rating, 10) as TRatingType,
          houseType: houseType as THouseType,
          rooms: Number.parseInt(rooms, 10),
          guests: Number.parseInt(guests, 10),
          rentalCost: Number.parseInt(rentalCost, 10),
          amenities: amenities.split(',').map((el) => el.trim()) as TAmenitiesType[],
          author: {
            name,
            email,
            avatarPath,
            userType,
          } as TUserData,
          coordinates: {
            latitude: Number(coordinate.split(',')[0]),
            longitude: Number(coordinate.split(',')[1]),
          },
        }),
      );
  }
}
