/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import { defaultClasses, getModelForClass, modelOptions, prop, Ref } from '@typegoose/typegoose';
import { OfferEntity } from '../offer/index.js';
import { UserEntity } from '../user/index.js';

export interface CommentEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'comments',
    timestamps: true,
  },
})
export class CommentEntity extends defaultClasses.TimeStamps {
  @prop({
    trim: true,
    required: true,
    minlength: [5, 'Min length for description path is 5'],
    maxlength: [1024, 'Max length for description path is 1024'],
  })
  public text: string;

  @prop({
    type: Number,
    required: true,
  })
  public rating: number;

  @prop({
    ref: OfferEntity,
    required: true,
  })
  public offerId: Ref<OfferEntity>;

  @prop({
    ref: UserEntity,
    required: true,
  })
  public userId: Ref<UserEntity>;
}

export const CommentModel = getModelForClass(CommentEntity);
