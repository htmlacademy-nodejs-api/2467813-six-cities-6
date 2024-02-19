import { inject, injectable } from 'inversify';
import { BaseController, HttpError } from '../../libs/rest/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { Component, HttpMethod } from '../../const/index.js';
import { CreateOfferRequest, IOfferService, OfferRdo, UpdateOfferRequest } from './index.js';
import { Request, Response } from 'express';
import { fillDTO } from '../../utils/index.js';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
    @inject(Component.OfferService) private readonly offerService: IOfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/', method: HttpMethod.Get, handler: this.index });
    this.addRoute({ path: '/:id/', method: HttpMethod.Put, handler: this.update });
    this.addRoute({ path: '/:id/', method: HttpMethod.Delete, handler: this.delete });
    this.addRoute({ path: '/:id/', method: HttpMethod.Get, handler: this.indexId });
  }

  public async create({ body }: CreateOfferRequest, res: Response): Promise<void> {
    const result = await this.offerService.create(body);

    this.created(res, fillDTO(OfferRdo, result));
  }

  public async index(_req: Request, res: Response): Promise<void> {
    const offers = await this.offerService.find();
    const responseData = fillDTO(OfferRdo, offers);
    this.ok(res, responseData);
  }

  public async update({ body, params }: UpdateOfferRequest, res: Response): Promise<void> {
    const offer = await this.offerService.updateById(String(params.id), body);
    const responseData = fillDTO(OfferRdo, offer);
    this.ok(res, responseData);
  }

  public async delete({ params }: Request, res: Response): Promise<void> {
    const existsOffer = await this.offerService.deleteById(params.id);

    if (!existsOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with the specified ID:«${params.id}» not found.`,
        'OfferController',
      );
    }

    this.noContent(res, existsOffer);
  }

  public async indexId({ params }: Request, res: Response): Promise<void> {
    const existsOffer = await this.offerService.findById(params.id);

    if (!existsOffer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with the specified ID:«${params.id}» not found.`,
        'OfferController',
      );
    }

    this.ok(res, fillDTO(OfferRdo, existsOffer));
  }
}
