/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
import { UserType } from '../../const/index.js';
import { TUser, TUserType } from '../../types/index.js';
import { defaultClasses, getModelForClass, modelOptions, prop } from '@typegoose/typegoose';
import { createSHA256 } from '../../utils/index.js';
import { Types } from 'mongoose';

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  },
})
export class UserEntity extends defaultClasses.TimeStamps implements TUser {
  @prop({
    type: String,
    required: true,
    trim: true,
  })
  public name: string;

  @prop({
    type: String,
    unique: true,
    required: true,
    trim: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
  })
  public email: string;

  @prop({
    type: String,
    required: false,
    trim: true,
  })
  public avatarPath?: string;

  @prop({
    type: String,
    required: true,
    enum: {
      values: [UserType.simple, UserType.pro],
      message: '{VALUE} is not supported',
    },
  })
  public userType: TUserType;

  @prop({
    type: Types.ObjectId,
    default: [],
  })
  public favoriteOffers: Types.Array<Types.ObjectId>;

  @prop({
    required: true,
  })
  private password?: string;

  constructor(userData: TUser) {
    super();

    this.email = userData.email;
    this.avatarPath = userData.avatarPath;
    this.name = userData.name;
    this.userType = userData.userType;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }

  public verifyPassword(password: string, salt: string) {
    const hashPassword = createSHA256(password, salt);
    return hashPassword === this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
