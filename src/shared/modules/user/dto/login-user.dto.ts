import { IsEmail, IsString, Length } from 'class-validator';
import { CreateUserMessages, Password } from '../const/index.js';

export class LoginUserDto {
  @IsEmail({}, { message: CreateUserMessages.email.invalidFormat })
  public email: string;

  @IsString({ message: CreateUserMessages.password.invalidFormat })
  @Length(Password.Min, Password.Max, { message: CreateUserMessages.password.lengthField })
  public password: string;
}
