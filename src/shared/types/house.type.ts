import { HOUSE_TYPE } from '../const/index.js';
import { TValueOf } from './value-of.type.js';

export type THouseType = TValueOf<typeof HOUSE_TYPE>;
