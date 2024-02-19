import { Container } from 'inversify';
import { CommentController, CommentEntity, CommentModel, DefaultCommentService, ICommentService } from './index.js';
import { types } from '@typegoose/typegoose';
import { Component } from '../../const/index.js';
import { IController } from '../../libs/rest/index.js';

export function createCommentContainer() {
  const commentContainer = new Container();

  commentContainer.bind<ICommentService>(Component.CommentService).to(DefaultCommentService).inSingletonScope();
  commentContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);
  commentContainer.bind<IController>(Component.CommentController).to(CommentController).inSingletonScope();

  return commentContainer;
}
