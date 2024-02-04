import { inject, injectable } from 'inversify';
import { Component } from '../../const/index.js';
import { IOfferService } from './offer-service.interface.js';
import { ILogger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { CreateOfferDto, OfferEntity } from './index.js';

@injectable()
export class DefaultOfferService implements IOfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);

    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).exec();
  }
}
