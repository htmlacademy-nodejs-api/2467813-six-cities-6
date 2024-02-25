import { inject, injectable } from 'inversify';
import { Component, SortTypeMongoDB } from '../../const/index.js';
import { IOfferService } from './offer-service.interface.js';
import { ILogger } from '../../libs/logger/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { CreateOfferDto, OfferEntity } from './index.js';
import { OfferCount } from './const/index.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { PipelineStage, Types } from 'mongoose';
import { UserEntity } from '../user/index.js';
import { HttpError } from '../../libs/rest/index.js';
import { StatusCodes } from 'http-status-codes';
import { CommentEntity } from '../comment/comment.entity.js';
import { TMatchConditions } from './types/match-conditions.type.js';

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

  private commentAndUsersPipeline = [
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
  ];

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
    const limit = premium ? OfferCount.premium : count ?? OfferCount.common;

    const matchConditions: TMatchConditions = {};

    if (city) {
      matchConditions.city = city;
    }

    if (premium !== undefined) {
      matchConditions.isPremium = premium;
    }

    const aggregationPipeline: PipelineStage[] = [
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
          $set: {
            isFavorite: true,
          },
        });
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
      ...this.commentAndUsersPipeline,
    );

    return this.offerModel.aggregate(aggregationPipeline).exec();
  }

  public async findById(offerId: string, userId?: string): Promise<DocumentType<OfferEntity> | null> {
    const aggregationPipeline: PipelineStage[] = [
      {
        $match: {
          _id: new Types.ObjectId(offerId),
        },
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
          $set: {
            isFavorite: true,
          },
        });
      }
    }

    aggregationPipeline.push(...this.commentAndUsersPipeline);

    const offers = await this.offerModel.aggregate(aggregationPipeline).exec();

    return offers.length > 0 ? offers[0] : null;
  }

  public async togglerFavorites(userId: string, offerId: string, isFavorite: boolean): Promise<boolean> {
    const user = await this.userModel.findById(userId).exec();

    if (!user) {
      throw new HttpError(StatusCodes.NOT_FOUND, `User with id ${userId} not found.`, 'DefaultOfferService');
    }

    const offerObjectId = new Types.ObjectId(offerId);

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
