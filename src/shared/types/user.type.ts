import { TUserType } from './user-type.type.js';

export type TUser = {
  name: string;
  email: string;
  avatarPath?: string | null;
  password: string;
  userType: TUserType;
};

export type TUserData = Omit<TUser, 'password'>;
