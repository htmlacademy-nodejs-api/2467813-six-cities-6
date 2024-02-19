import { UserType } from '../const/index.js';
import { TValueOf } from './index.js';

export type TUserType = TValueOf<typeof UserType>;
