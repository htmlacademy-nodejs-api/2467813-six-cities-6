import { inject, injectable } from 'inversify';
import {
  BaseController,
  DocumentExistsMiddleware,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware,
} from '../../libs/rest/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { Component, HttpMethod, Path } from '../../const/index.js';
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
      middlewares: [new ValidateDtoMiddleware(CreateOfferDto)],
    });
    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({
      path: '/:id/',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
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
      path: `/:id/${Path.Comments}/`,
      method: HttpMethod.Put,
      handler: this.updateFavorite,
      middlewares: [
        new ValidateObjectIdMiddleware('id'),
        new DocumentExistsMiddleware(this.offerService, 'offer', 'id'),
      ],
    });
  }

  public async create({ body }: TCreateOfferRequest, res: Response): Promise<void> {
    const result = await this.offerService.create(body);
    this.created(res, fillDTO(OfferRdo, result));
  }

  public async index({ query }: Request<unknown, unknown, unknown, TRequestQuery>, res: Response): Promise<void> {
    const { limit } = query;
    const offers = await this.offerService.find(!isNaN(Number(limit)) ? Number(limit) : undefined);
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

  public async show({ params }: Request<TParamOfferId>, res: Response): Promise<void> {
    const { id } = params;
    const offer = await this.offerService.findById(id);
    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async updateFavorite({ params }: Request<TParamOfferId>, res: Response): Promise<void> {
    // FIXME:ПОПРАВИТЬ ИЗБРАННОЕ КАК БУДЕТ ДОСТУП ЧЕРЕЗ ТОКЕН
    const user = '65d0a425f9edd529dc99adfb';
    const { id } = params;
    const offer = await this.offerService.togglerFavorites(user, id);

    this.ok(res, {
      isFavorite: offer,
    });
  }
}
