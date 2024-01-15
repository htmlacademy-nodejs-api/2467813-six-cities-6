import { TValueOf } from './value-of.type.js';

export const USER_TYPE = {
  simple: 'обычный',
  pro: 'pro',
} as const;

export type TUserType = TValueOf<typeof USER_TYPE>;
