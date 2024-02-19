import { inject, injectable } from 'inversify';
import { BaseController } from '../../libs/rest/index.js';
import { Component, HttpMethod } from '../../const/const.js';
import { ILogger } from '../../libs/logger/logger.interface.js';
import { CreateCommentRequest, ICommentService } from './index.js';
import { Response } from 'express';
import { fillDTO } from '../../utils/index.js';
import { CommentRdo } from './rdo/comment.rdo.js';

@injectable()
export class CommentController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
    // @inject(Component.Config) private readonly config: IConfig<TRestSchema>,
    @inject(Component.CommentService) private readonly commentService: ICommentService,
  ) {
    super(logger);

    this.logger.info('Register routes for CommentController...');

    this.addRoute({ path: '/:id/', method: HttpMethod.Post, handler: this.create });
  }

  public async create({ body }: CreateCommentRequest, res: Response): Promise<void> {
    const result = await this.commentService.create(body);

    this.created(res, fillDTO(CommentRdo, result));
  }
}
