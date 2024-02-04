import { TUserType } from '../../../types/index.js';

export class CreateUserDto {
  public name: string;
  public email: string;
  public avatarPath?: string;
  public userType: TUserType;
  public password: string;
}
