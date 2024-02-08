import { inject, injectable } from 'inversify';
import { Component, SortTypeMongoDB } from '../../const/index.js';
import { IOfferService } from './offer-service.interface.js';
import { ILogger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { CreateOfferDto, OfferEntity } from './index.js';
import { DEFAULT_OFFER_COUNT, DEFAULT_OFFER_PREMIUM_COUNT } from './const/index.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
// TSortTypeMongo
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

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndUpdate(offerId, dto, { new: true }).populate(['userId']).exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    // FIXME: При удалении объявления, комментарии к объявлению удаляются автоматически.
    // Возможно надо сделать агрегацию и добавить коллекцию комментариев
    return this.offerModel.findByIdAndDelete(offerId).exec();
  }

  public async find(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_COUNT;
    return this.offerModel.find().sort({ createdAt: SortTypeMongoDB.Down }).limit(limit).populate(['userId']).exec();
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).populate(['userId']).exec();
  }

  public async findPremium(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_PREMIUM_COUNT;
    return this.offerModel.find().sort({ createdAt: SortTypeMongoDB.Down }).limit(limit).populate(['userId']).exec();
  }

  public async findFavorites(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_COUNT;
    return this.offerModel
      .find({ isFavorite: true }, {}, { limit })
      .sort({ createdAt: SortTypeMongoDB.Down })
      .populate(['userId'])
      .exec();
  }

  public async incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, {
        $inc: {
          commentCount: 1,
        },
      })
      .exec();
  }

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel.exists({ _id: documentId })) !== null;
  }
}
