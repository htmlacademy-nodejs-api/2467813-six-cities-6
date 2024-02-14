import { inject, injectable } from 'inversify';
import { CommentEntity, CreateCommentDto, ICommentService } from './index.js';
import { Component, SortTypeMongoDB } from '../../const/index.js';
import { DocumentType, types } from '@typegoose/typegoose';
import { DEFAULT_COMMENT_COUNT } from './const/index.js';
import { ILogger } from '../../libs/logger/index.js';

@injectable()
export class DefaultCommentService implements ICommentService {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.CommentModel) private readonly commentModel: types.ModelType<CommentEntity>,
  ) {}

  public async create(dto: CreateCommentDto): Promise<DocumentType<CommentEntity>> {
    const comment = await this.commentModel.create(dto);
    this.logger.info(`New comment created: ${dto.text}`);
    return comment;
  }

  public async findByOfferId(offerId: string, count?: number): Promise<DocumentType<CommentEntity>[]> {
    const limit = count ?? DEFAULT_COMMENT_COUNT;
    return this.commentModel
      .find({ offerId })
      .sort({ createdAt: SortTypeMongoDB.Down })
      .limit(limit)
      .populate('userId')
      .exec();
  }

  public async deleteByOfferId(offerId: string): Promise<number> {
    const result = await this.commentModel.deleteMany({ offerId }).exec();

    return result.deletedCount;
  }
}
