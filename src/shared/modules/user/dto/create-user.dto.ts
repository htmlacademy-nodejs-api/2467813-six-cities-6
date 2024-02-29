import { IsEmail, IsIn, IsString, Length } from 'class-validator';
import { TUserType } from '../../../types/index.js';
import { CreateUserMessages, Name, Password } from '../const/index.js';
import { UserType } from '../../../const/index.js';

export class CreateUserDto {
  @IsString({ message: CreateUserMessages.name.invalidFormat })
  @Length(Name.Min, Name.Max, { message: CreateUserMessages.name.lengthField })
  public name: string;

  @IsEmail({}, { message: CreateUserMessages.email.invalidFormat })
  public email: string;

  @IsIn([UserType.simple, UserType.pro], {
    message: CreateUserMessages.userType.invalidFormat,
  })
  public userType: TUserType;

  @IsString({ message: CreateUserMessages.password.invalidFormat })
  @Length(Password.Min, Password.Max, { message: CreateUserMessages.password.lengthField })
  public password: string;
}
