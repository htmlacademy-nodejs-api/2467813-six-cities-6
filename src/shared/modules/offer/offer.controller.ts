import { inject, injectable } from 'inversify';
import { BaseController, HttpError } from '../../libs/rest/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { Component, HttpMethod } from '../../const/index.js';
import { CreateOfferRequest, IOfferService, OfferRdo } from './index.js';
// import { IConfig, TRestSchema } from '../../config/index.js';
import { Request, Response } from 'express';
import { fillDTO } from '../../utils/index.js';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class OfferController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
    // @inject(Component.Config) private readonly config: IConfig<TRestSchema>,
    @inject(Component.OfferService) private readonly offerService: IOfferService,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController...');

    this.addRoute({ path: '/', method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: '/:id/', method: HttpMethod.Get, handler: this.indexId });
  }

  public async create({ body }: CreateOfferRequest, res: Response): Promise<void> {
    const result = await this.offerService.create(body);

    this.created(res, fillDTO(OfferRdo, result));
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
    // this.ok(res, existsOffer);
  }
}
