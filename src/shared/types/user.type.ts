import { TUserType } from './user-type.type.js';

export type TUser = {
  name: string;
  email: string;
  avatarPath?: string;
  userType: TUserType;
};
