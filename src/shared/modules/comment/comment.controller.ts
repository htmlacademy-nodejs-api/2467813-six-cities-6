import { inject, injectable } from 'inversify';
import {
  BaseController,
  DocumentExistsMiddleware,
  HttpError,
  TRequestQuery,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware,
} from '../../libs/rest/index.js';
import { Component, HttpMethod, Path } from '../../const/const.js';
import { ILogger } from '../../libs/logger/logger.interface.js';
import { CreateCommentDto, CreateCommentRequest, ICommentService } from './index.js';
import { Request, Response } from 'express';
import { fillDTO } from '../../utils/index.js';
import { CommentRdo } from './rdo/comment.rdo.js';
import { COMMENT_CONTROLLER } from './const/index.js';
import { IOfferService } from '../offer/index.js';
import { StatusCodes } from 'http-status-codes';
import { TParamOfferId } from '../offer/types/param-offerid.type.js';
import { OFFER_CONTROLLER } from '../offer/const/index.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
    @inject(Component.OfferService) private readonly offerService: IOfferService,
    @inject(Component.CommentService) private readonly commentService: ICommentService,
  ) {
    super(logger);

    this.logger.info(`Register routes for ${COMMENT_CONTROLLER}...`);

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateCommentDto)],
    });
    this.addRoute({
      path: `/:id/${Path.Comments}/`,
      method: HttpMethod.Get,
      handler: this.getComments,
      middlewares: [
        new ValidateObjectIdMiddleware('id'),
        new DocumentExistsMiddleware(this.offerService, 'offer', 'id'),
      ],
    });
  }

  public async create({ body }: CreateCommentRequest, res: Response): Promise<void> {
    if (!(await this.offerService.exists(body.offerId))) {
      throw new HttpError(StatusCodes.NOT_FOUND, `Offer with id ${body.offerId} not found.`, `${OFFER_CONTROLLER}`);
    }

    const comment = await this.commentService.create(body);

    this.created(res, fillDTO(CommentRdo, comment));
  }

  public async getComments(
    { params, query }: Request<TParamOfferId, unknown, unknown, TRequestQuery>,
    res: Response,
  ): Promise<void> {
    const { id } = params;
    const { limit } = query;
    const comments = await this.commentService.findByOfferId(id, !isNaN(Number(limit)) ? Number(limit) : undefined);
    this.ok(res, fillDTO(CommentRdo, comments));
  }
}
