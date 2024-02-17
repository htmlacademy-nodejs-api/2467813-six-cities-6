import { inject, injectable } from 'inversify';
import { Component, SortTypeMongoDB } from '../../const/index.js';
import { IOfferService } from './offer-service.interface.js';
import { ILogger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { CreateOfferDto, OfferEntity } from './index.js';
import { OfferCount } from './const/index.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { Types } from 'mongoose';
import { UserEntity } from '../user/index.js';
import { HttpError } from '../../libs/rest/index.js';
import { StatusCodes } from 'http-status-codes';

@injectable()
export class DefaultOfferService implements IOfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const offer = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.title}`);
    return offer;
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndUpdate(offerId, dto, { new: true }).populate(['userId']).exec();
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findByIdAndDelete(offerId).exec();
    // FIXME: НЕ ПОЛУЧАЕТСЯ РЕШИТЬ КАСКАДНОЕ УДАЛЕНИЕ ЧЕРЕЗ ТРАНЗАКЦИЮ
    // const session = await startSession();
    // try {
    //   session.startTransaction();

    //   // Удаление предложения
    //   const deletedOffer = await this.offerModel.findByIdAndDelete(offerId).session(session).exec();

    //   // Если предложение удалено, удаляем связанные комментарии
    //   if (deletedOffer) {
    //     await this.commentModel
    //       .deleteMany({ offerId: new Types.ObjectId(offerId) })
    //       .session(session)
    //       .exec();
    //   }

    //   // Завершение транзакции
    //   await session.commitTransaction();
    //   return deletedOffer;
    // } catch (error) {
    //   await session.abortTransaction();
    //   throw error;
    // } finally {
    //   session.endSession();
    // }
  }

  // FIXME:ПОПРАВИТЬ ИЗБРАННОЕ КАК БУДЕТ ДОСТУП ЧЕРЕЗ ТОКЕН
  public async find(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? OfferCount.common;
    return this.offerModel
      .aggregate([
        {
          $sort: {
            createdAt: SortTypeMongoDB.Down,
          },
        },
        {
          $limit: limit,
        },
        {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'offerId',
            as: 'comments',
          },
        },
        {
          $set: {
            commentCount: {
              $size: '$comments',
            },
            rating: {
              $avg: '$comments.rating',
            },
            publicationDate: '$createdAt',
            id: '$_id',
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $unwind: {
            path: '$user',
          },
        },
        {
          $set: {
            'user.id': '$user._id',
          },
        },
        {
          $project: {
            comments: 0,
          },
        },
      ])
      .exec();
  }

  // FIXME:ПОПРАВИТЬ ИЗБРАННОЕ КАК БУДЕТ ДОСТУП ЧЕРЕЗ ТОКЕН
  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    const offers = await this.offerModel
      .aggregate([
        {
          $match: { _id: new Types.ObjectId(offerId) },
        },
        {
          $lookup: {
            from: 'comments',
            localField: '_id',
            foreignField: 'offerId',
            as: 'comments',
          },
        },
        {
          $set: {
            commentCount: {
              $size: '$comments',
            },
            rating: {
              $avg: '$comments.rating',
            },
            publicationDate: '$createdAt',
          },
        },
        {
          $lookup: {
            from: 'users',
            localField: 'userId',
            foreignField: '_id',
            as: 'user',
          },
        },
        {
          $project: {
            comments: 0,
          },
        },
        {
          $unwind: '$user',
        },
        {
          $set: {
            'user.id': '$user._id',
          },
        },
      ])
      .exec();

    return offers.length > 0 ? offers[0] : null;
  }

  public async findPremium(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? OfferCount.premium;
    return this.offerModel.find().sort({ createdAt: SortTypeMongoDB.Down }).limit(limit).populate(['userId']).exec();
  }

  public async findFavorites(count?: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? OfferCount.common;
    return this.offerModel
      .find({ isFavorite: true }, {}, { limit })
      .sort({ createdAt: SortTypeMongoDB.Down })
      .populate(['userId'])
      .exec();
  }

  public async togglerFavorites(userId: string, offerId: string): Promise<boolean> {
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      throw new HttpError(StatusCodes.NOT_FOUND, `User with id ${userId} not found.`, 'DefaultOfferService');
    }

    const offerObjectId = new Types.ObjectId(offerId);
    const isFavorite = user.favoriteOffers.includes(offerObjectId);

    if (isFavorite) {
      // Если предложение уже в избранном, удаляем его
      user.favoriteOffers.pull(offerObjectId);

      await user.save();
      return false;
    } else {
      // Если предложения нет в избранном, добавляем его
      user.favoriteOffers.push(offerObjectId);

      await user.save();
      return true;
    }
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
