import { USER_TYPE } from '../const/index.js';
import { TValueOf } from './value-of.type.js';

export type TUserType = TValueOf<typeof USER_TYPE>;
