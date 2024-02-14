import { Expose, Type } from 'class-transformer';
import { TAmenitiesType, TCityType, THouseType } from '../../../types/index.js';
import { UserRdo } from '../../user/index.js';

export class OfferRdo {
  @Expose()
  public title: string;

  @Expose()
  public description: string;

  @Expose()
  public publicationDate: Date;

  @Expose()
  public city: TCityType;

  @Expose()
  public previewImage: string;

  @Expose()
  public listImages: string[];

  @Expose()
  public isPremium: boolean;

  @Expose()
  public isFavorite: boolean;

  @Expose()
  public rating: number;

  @Expose()
  public houseType: THouseType;

  @Expose()
  public rooms: number;

  @Expose()
  public guests: number;

  @Expose()
  public rentalCost: number;

  @Expose()
  public amenities: TAmenitiesType[];

  @Expose()
  public latitude: number;

  @Expose()
  public longitude: number;

  @Expose()
  public commentCount: number;

  @Expose()
  @Type(() => UserRdo)
  public user: UserRdo;
}
