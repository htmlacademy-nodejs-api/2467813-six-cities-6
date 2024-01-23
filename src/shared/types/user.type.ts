import { TUserType } from './user-type.type.js';

export type TUser = {
  name: string; // Обязательное. Мин. длина 1 символ, макс. длина 15 символов;
  email: string; // Обязательное. Валидный адрес электронной почты;
  avatarPath?: string | null; // Необязательное. Изображение пользователя в формате .jpg или .png;
  password: string; // Обязательное. Мин. длина 6 символов, макс. длина 12 символов;
  userType: TUserType; // Тип пользователя
};

export type TUserData = Omit<TUser, 'password'>;
