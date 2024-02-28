import { inject, injectable } from 'inversify';
import {
  BaseController,
  DocumentExistsMiddleware,
  HttpError,
  TRequestBody,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware,
} from '../../libs/rest/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { Component, HttpMethod, Path, TRUE } from '../../const/index.js';
import {
  TCreateOfferRequest,
  IOfferService,
  OfferRdo,
  TUpdateOfferRequest,
  CreateOfferDto,
  UpdateOfferDto,
} from './index.js';
import { Request, Response } from 'express';
import { fillDTO } from '../../utils/index.js';
import { TParamOfferId } from './types/param-offerid.type.js';
import { OFFER_CONTROLLER } from './const/index.js';
import { TRequestQuery } from '../../libs/rest/types/request-query.type.js';
import { PrivateRouteMiddleware } from '../../libs/rest/middleware/private-route.middleware.js';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
    @inject(Component.OfferService) private readonly offerService: IOfferService,
  ) {
    super(logger);

    this.logger.info(`Register routes for ${OFFER_CONTROLLER}...`);

    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new PrivateRouteMiddleware(), new ValidateDtoMiddleware(CreateOfferDto)],
    });
    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/:id/',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('id'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offerService, 'offer', 'id'),
      ],
    });
    this.addRoute({
      path: '/:id/',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('id'),
        new DocumentExistsMiddleware(this.offerService, 'offer', 'id'),
      ],
    });
    this.addRoute({
      path: '/:id/',
      method: HttpMethod.Get,
      handler: this.show,
      middlewares: [
        new ValidateObjectIdMiddleware('id'),
        new DocumentExistsMiddleware(this.offerService, 'offer', 'id'),
      ],
    });
    this.addRoute({
      path: `/:id/${Path.Favorite}/`,
      method: HttpMethod.Put,
      handler: this.updateFavorite,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('id'),
        new DocumentExistsMiddleware(this.offerService, 'offer', 'id'),
      ],
    });
  }

  public async create({ body, tokenPayload }: TCreateOfferRequest, res: Response): Promise<void> {
    const offer = await this.offerService.create({ ...body, userId: tokenPayload.id });
    this.created(res, fillDTO(OfferRdo, offer));
  }

  public async index(
    { query, tokenPayload }: Request<unknown, unknown, unknown, TRequestQuery>,
    res: Response,
  ): Promise<void> {
    const { limit, city, premium, favorite } = query;
    const count = limit === undefined ? undefined : Number(limit);
    const town = city ?? undefined;
    const isPremium = premium === undefined ? undefined : premium === TRUE;

    const isFavorite = favorite === undefined ? undefined : favorite === TRUE;
    const userId = tokenPayload?.id;

    if (isFavorite && !userId) {
      throw new HttpError(StatusCodes.UNAUTHORIZED, 'Unauthorized', `${OFFER_CONTROLLER}`);
    }

    const offers = await this.offerService.find(count, town, isPremium, isFavorite, userId);
    this.ok(res, fillDTO(OfferRdo, offers));
  }

  public async update({ body, params }: TUpdateOfferRequest, res: Response): Promise<void> {
    const { id } = params;
    const offer = await this.offerService.updateById(String(id), body);
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async delete({ params }: Request<TParamOfferId>, res: Response): Promise<void> {
    const { id } = params;
    const offer = await this.offerService.deleteById(id);
    this.noContent(res, offer);
  }

  public async show({ params, tokenPayload }: Request<TParamOfferId>, res: Response): Promise<void> {
    const { id } = params;
    const userId = tokenPayload?.id;
    const offer = await this.offerService.findById(id, userId);
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async updateFavorite(
    { params, tokenPayload, body }: Request<TParamOfferId, TRequestBody, { isFavorite: string }>,
    res: Response,
  ): Promise<void> {
    const { id } = params;
    const isFavorite = body.isFavorite === TRUE;
    const userId = tokenPayload.id;

    const offer = await this.offerService.togglerFavorites(userId, id, isFavorite);

    this.ok(res, {
      isFavorite: offer,
    });
  }
}
