import { inject, injectable } from 'inversify';
import { BaseController, HttpError } from '../../libs/rest/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { Component, HttpMethod } from '../../const/index.js';
import { TCreateOfferRequest, IOfferService, OfferRdo, TUpdateOfferRequest } from './index.js';
import { Request, Response } from 'express';
import { fillDTO } from '../../utils/index.js';
import { StatusCodes } from 'http-status-codes';
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

    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/:id/', method: HttpMethod.Patch, handler: this.update });
    this.addRoute({ path: '/:id/', method: HttpMethod.Delete, handler: this.delete });
    this.addRoute({ path: '/:id/', method: HttpMethod.Get, handler: this.show });
    this.addRoute({ path: '/:id/favorite/', method: HttpMethod.Put, handler: this.updateFavorite });
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

    if (!offer) {
      throw new HttpError(StatusCodes.NOT_FOUND, `Offer with id ${id} not found.`, `${OFFER_CONTROLLER}`);
    }

    this.ok(res, fillDTO(OfferRdo, offer));
  }

  public async delete({ params }: Request<TParamOfferId>, res: Response): Promise<void> {
    const { id } = params;
    const offer = await this.offerService.deleteById(id);

    if (!offer) {
      throw new HttpError(StatusCodes.NOT_FOUND, `Offer with id ${id} not found.`, `${OFFER_CONTROLLER}`);
    }

    this.noContent(res, offer);
  }

  public async show({ params }: Request<TParamOfferId>, res: Response): Promise<void> {
    const { id } = params;
    const offer = await this.offerService.findById(id);

    if (!offer) {
      throw new HttpError(StatusCodes.NOT_FOUND, `Offer with id ${id} not found.`, `${OFFER_CONTROLLER}`);
    }

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
