/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { CommentEntity } from '../comment/comment.entity.js';

@injectable()
export class DefaultOfferService implements IOfferService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.UserModel) private readonly userModel: types.ModelType<UserEntity>,
    @inject(Component.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
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
    const deletedOffer = await this.offerModel.findByIdAndDelete(offerId).exec();

    if (deletedOffer) {
      await this.commentModel.deleteMany({ offerId: new Types.ObjectId(offerId) }).exec();
    }

    return deletedOffer;
  }

  public async find(
    count?: number,
    city?: string,
    premium?: boolean,
    favorite?: boolean,
    userId?: string,
  ): Promise<DocumentType<OfferEntity>[]> {
    let limit = count ?? OfferCount.common;

    const matchConditions: any = {};

    if (city) {
      matchConditions.city = city;
    }

    if (premium) {
      limit = OfferCount.premium;
      matchConditions.isPremium = true;
    } else if (premium === false) {
      matchConditions.isPremium = false;
    }

    const aggregationPipeline: any = [
      {
        $match: matchConditions,
      },
    ];

    if (favorite && userId) {
      const user = await this.userModel.findById(userId);

      if (user && user.favoriteOffers) {
        aggregationPipeline.unshift({
          $match: {
            _id: {
              $in: user.favoriteOffers,
            },
          },
        });

        aggregationPipeline.push({
          $addFields: {
            isFavorite: true,
          },
        });
      } else {
        return [];
      }
    }

    aggregationPipeline.push(
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
    );

    return this.offerModel.aggregate(aggregationPipeline).exec();
  }

  public async findById(offerId: string, userId?: string): Promise<DocumentType<OfferEntity> | null> {
    const aggregationPipeline: any = [
      {
        $match: { _id: new Types.ObjectId(offerId) },
      },
    ];

    if (userId) {
      const user = await this.userModel.findById(userId);

      if (user && user.favoriteOffers) {
        aggregationPipeline.unshift({
          $match: {
            _id: {
              $in: user.favoriteOffers,
            },
          },
        });

        aggregationPipeline.push({
          $addFields: {
            isFavorite: true,
          },
        });
      }
    }

    aggregationPipeline.push(
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
    );

    const offers = await this.offerModel.aggregate(aggregationPipeline).exec();

    return offers.length > 0 ? offers[0] : null;
  }

  public async togglerFavorites(userId: string, offerId: string, isFavorite: boolean): Promise<boolean> {
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      throw new HttpError(StatusCodes.NOT_FOUND, `User with id ${userId} not found.`, 'DefaultOfferService');
    }

    const offerObjectId = new Types.ObjectId(offerId);
    // const isFavorite = user.favoriteOffers.includes(offerObjectId);

    if (!isFavorite) {
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

  public async exists(documentId: string): Promise<boolean> {
    return (await this.offerModel.exists({ _id: documentId })) !== null;
  }
}
