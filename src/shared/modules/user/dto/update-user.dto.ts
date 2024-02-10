import { TUserType } from '../../../types/index.js';

export class UpdateUserDto {
  public avatarPath?: string;
  public name?: string;
  public email?: string;
  public userType?: TUserType;
  public password?: string;
}
