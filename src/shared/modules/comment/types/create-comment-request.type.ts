import { Request } from 'express';
import { TRequestBody, TRequestParams } from '../../../libs/rest/index.js';
import { CreateCommentDto } from '../index.js';

export type CreateCommentRequest = Request<TRequestParams, TRequestBody, CreateCommentDto>;
