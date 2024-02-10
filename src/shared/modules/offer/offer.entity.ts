/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import { Ref, defaultClasses, getModelForClass, modelOptions, mongoose, prop } from '@typegoose/typegoose';
import { TAmenitiesType } from '../../types/amenities.type.js';
import { TCityType } from '../../types/city.type.js';
import { THouseType } from '../../types/house.type.js';
import { CityType, HouseType } from '../../const/index.js';
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
    minlength: [10, 'Min length for title path is 10'],
    maxlength: [100, 'Max length for title path is 100'],
  })
  public title: string;

  @prop({
    type: String,
    trim: true,
    required: true,
    minlength: [20, 'Min length for description path is 20'],
    maxlength: [1024, 'Max length for description path is 1024'],
  })
  public description: string;

  @prop({
    type: Date,
    required: true,
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
    match: [/\.(jpg|png)(\?.*)?$/i, 'The user`s image must include an extension.jpg or .png'],
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
    min: [1, 'Min length for rooms path is 1'],
    max: [8, 'Max length for rooms path is 8'],
  })
  public rooms: number;

  @prop({
    type: Number,
    required: true,
    min: [1, 'Min length for guests path is 1'],
    max: [10, 'Max length for guests path is 10'],
  })
  public guests: number;

  @prop({
    type: Number,
    required: true,
    min: [100, 'Min length for rentalCost path is 100'],
    max: [100000, 'Max length for rentalCost path is 100000'],
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
    default: 0,
  })
  public commentCount: number;

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId: Ref<UserEntity>;
}

export const OfferModel = getModelForClass(OfferEntity);
