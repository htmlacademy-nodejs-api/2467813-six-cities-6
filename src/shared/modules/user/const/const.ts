import { UserType } from '../../../const/index.js';

export const USER_CONTROLLER = 'UserController';
export const DEFAULT_AVATAR_FILE_NAME = 'default-avatar.jpg';

export const Name = {
  Min: 1,
  Max: 15,
} as const;

export const Password = {
  Min: 6,
  Max: 12,
} as const;

export const CreateUserMessages = {
  name: {
    invalidFormat: 'name is required',
    lengthField: `min length is ${Name.Min}, max is ${Name.Max}`,
  },
  email: {
    invalidFormat: 'email must be a valid address',
  },
  avatarPath: {
    invalidFormat: 'avatarPath is required',
  },
  userType: {
    invalidFormat: `type must be ${UserType.simple} or ${UserType.pro}`,
  },
  password: {
    invalidFormat: 'password is required',
    lengthField: `min length for password is ${Password.Min}, max is ${Password.Max}`,
  },
} as const;
