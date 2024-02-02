import { Schema, Document, model } from 'mongoose';
import { TUserData } from '../../types/index.js';

export interface IUserDocument extends TUserData, Document {}

const userSchema = new Schema({
  email: String,
  avatarPath: String,
  name: String,
  userType: String,
});

export const UserModel = model<IUserDocument>('User', userSchema);
