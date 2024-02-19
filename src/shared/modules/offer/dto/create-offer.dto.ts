import { TAmenitiesType, TCityType, THouseType } from '../../../types/index.js';

export class CreateOfferDto {
  public title: string;
  public description: string;
  public city: TCityType;
  public previewImage: string;
  public listImages: string[];
  public isPremium: boolean;
  public houseType: THouseType;
  public rooms: number;
  public guests: number;
  public rentalCost: number;
  public amenities: TAmenitiesType[];
  public latitude: number;
  public longitude: number;
  public userId: string;
}
