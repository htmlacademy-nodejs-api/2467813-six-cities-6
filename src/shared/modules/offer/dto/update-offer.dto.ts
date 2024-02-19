import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { TAmenitiesType, TCityType, THouseType } from '../../../types/index.js';
import { CreateOfferValidationMessage } from '../const/index.js';
import { AmenitiesType, CityType, HouseType } from '../../../const/index.js';

export class UpdateOfferDto {
  @IsOptional()
  @IsString({ message: CreateOfferValidationMessage.title.invalidFormat })
  @MinLength(10, { message: CreateOfferValidationMessage.title.minLength })
  @MaxLength(100, { message: CreateOfferValidationMessage.title.maxLength })
  public title?: string;

  @IsOptional()
  @IsString({ message: CreateOfferValidationMessage.description.invalidFormat })
  @MinLength(20, { message: CreateOfferValidationMessage.description.minLength })
  @MaxLength(1024, { message: CreateOfferValidationMessage.description.maxLength })
  public description?: string;

  @IsOptional()
  public publicationDate?: Date;

  @IsOptional()
  @IsIn(
    [CityType.Paris, CityType.Cologne, CityType.Brussels, CityType.Amsterdam, CityType.Hamburg, CityType.Dusseldorf],
    {
      message: CreateOfferValidationMessage.city.invalidFormat,
    },
  )
  public city?: TCityType;

  @IsOptional()
  @IsUrl(
    {},
    {
      message: CreateOfferValidationMessage.previewImage.isUrl,
    },
  )
  @Matches(/\.(jpg|png)(\?.*)?$/i, {
    message: CreateOfferValidationMessage.previewImage.matches,
  })
  public previewImage?: string;

  @IsOptional()
  @IsArray({ message: CreateOfferValidationMessage.listImages.invalidFormat })
  @ArrayMinSize(6, { message: CreateOfferValidationMessage.listImages.ArrayMinSize })
  @ArrayMaxSize(6, { message: CreateOfferValidationMessage.listImages.ArrayMaxSize })
  public listImages?: string[];

  @IsOptional()
  @IsBoolean({ message: CreateOfferValidationMessage.isPremium.invalidFormat })
  public isPremium?: boolean;

  @IsOptional()
  public isFavorite?: boolean;

  @IsOptional()
  public rating?: number;

  @IsOptional()
  @IsIn([HouseType.apartment, HouseType.house, HouseType.room, HouseType.hotel], {
    message: CreateOfferValidationMessage.houseType.invalidFormat,
  })
  public houseType?: THouseType;

  @IsOptional()
  @IsInt({ message: CreateOfferValidationMessage.rooms.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.rooms.minValue })
  @Max(8, { message: CreateOfferValidationMessage.rooms.maxValue })
  public rooms?: number;

  @IsOptional()
  @IsInt({ message: CreateOfferValidationMessage.guests.invalidFormat })
  @Min(1, { message: CreateOfferValidationMessage.guests.minValue })
  @Max(10, { message: CreateOfferValidationMessage.guests.maxValue })
  public guests?: number;

  @IsOptional()
  @IsInt({ message: CreateOfferValidationMessage.rentalCost.invalidFormat })
  @Min(100, { message: CreateOfferValidationMessage.rentalCost.minValue })
  @Max(100_000, { message: CreateOfferValidationMessage.rentalCost.maxValue })
  public rentalCost?: number;

  @IsOptional()
  @IsArray({ message: CreateOfferValidationMessage.amenities.invalidFormat })
  @IsIn(
    [
      AmenitiesType.Breakfast,
      AmenitiesType['Air conditioning'],
      AmenitiesType['Laptop friendly workspace'],
      AmenitiesType['Baby seat'],
      AmenitiesType.Washer,
      AmenitiesType.Towels,
      AmenitiesType.Fridge,
    ],
    {
      each: true,
      message: CreateOfferValidationMessage.amenities.invalidFormat,
    },
  )
  public amenities?: TAmenitiesType[];

  @IsOptional()
  @IsNumber({}, { message: CreateOfferValidationMessage.latitude.invalidFormat })
  public latitude?: number;

  @IsOptional()
  @IsNumber({}, { message: CreateOfferValidationMessage.longitude.invalidFormat })
  public longitude?: number;
}
