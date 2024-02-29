/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import { Ref, defaultClasses, getModelForClass, modelOptions, mongoose, prop } from '@typegoose/typegoose';
import { TAmenitiesType } from '../../types/amenities.type.js';
import { TCityType } from '../../types/city.type.js';
import { THouseType } from '../../types/house.type.js';
import { CityType, HouseType, IMAGE_REX_EXP } from '../../const/index.js';
import { UserEntity } from '../user/index.js';

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers',
    timestamps: true,
  },
})
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({
    type: String,
    trim: true,
    required: true,
  })
  public title: string;

  @prop({
    type: String,
    trim: true,
    required: true,
  })
  public description: string;

  @prop({
    type: Date,
    required: true,
    default: Date.now,
  })
  public publicationDate: Date;

  @prop({
    type: String,
    required: true,
    enum: {
      values: [
        CityType.Paris,
        CityType.Cologne,
        CityType.Brussels,
        CityType.Amsterdam,
        CityType.Hamburg,
        CityType.Dusseldorf,
      ],
      message: '{VALUE} is not supported',
    },
  })
  public city: TCityType;

  @prop({
    type: String,
    required: true,
    trim: true,
    match: [IMAGE_REX_EXP, 'The previewImage image must include an extension.jpg or .png'],
  })
  public previewImage: string;

  @prop({
    type: String,
    required: true,
    default: [],
  })
  public listImages: mongoose.Types.Array<string>;

  @prop({
    type: Boolean,
    required: true,
  })
  public isPremium: boolean;

  @prop({
    type: Boolean,
    required: true,
    default: false,
  })
  public isFavorite: boolean;

  @prop({
    type: Number,
    required: true,
    default: 0,
  })
  public rating: number;

  @prop({
    type: String,
    required: true,
    enum: {
      values: [HouseType.apartment, HouseType.house, HouseType.room, HouseType.hotel],
      message: '{VALUE} is not supported',
    },
  })
  public houseType: THouseType;

  @prop({
    type: Number,
    required: true,
  })
  public rooms: number;

  @prop({
    type: Number,
    required: true,
  })
  public guests: number;

  @prop({
    type: Number,
    required: true,
  })
  public rentalCost: number;

  @prop({
    type: String,
    required: true,
    default: [],
  })
  public amenities: mongoose.Types.Array<TAmenitiesType>;

  @prop({
    type: Number,
    required: true,
  })
  public latitude: number;

  @prop({
    type: Number,
    required: true,
  })
  public longitude: number;

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId: Ref<UserEntity>;
}

export const OfferModel = getModelForClass(OfferEntity);
