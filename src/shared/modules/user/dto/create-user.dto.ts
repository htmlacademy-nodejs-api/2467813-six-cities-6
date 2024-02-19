import { IsEmail, IsIn, IsOptional, IsString, Length } from 'class-validator';
import { TUserType } from '../../../types/index.js';
import { CreateUserMessages } from '../const/index.js';
import { UserType } from '../../../const/index.js';

export class CreateUserDto {
  @IsString({ message: CreateUserMessages.name.invalidFormat })
  @Length(1, 15, { message: CreateUserMessages.name.lengthField })
  public name: string;

  @IsEmail({}, { message: CreateUserMessages.email.invalidFormat })
  public email: string;

  @IsOptional()
  @IsString({ message: CreateUserMessages.avatarPath.invalidFormat })
  public avatarPath?: string;

  @IsIn([UserType.simple, UserType.pro], {
    message: CreateUserMessages.userType.invalidFormat,
  })
  public userType: TUserType;

  @IsString({ message: CreateUserMessages.password.invalidFormat })
  @Length(6, 12, { message: CreateUserMessages.password.lengthField })
  public password: string;
}
