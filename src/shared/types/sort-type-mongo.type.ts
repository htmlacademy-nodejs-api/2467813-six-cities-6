import { SortTypeMongoDB } from '../const/index.js';
import { TValueOf } from './value-of.type.js';

export type TSortTypeMongo = TValueOf<typeof SortTypeMongoDB>;
