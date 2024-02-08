import { Container } from 'inversify';
import { CommentEntity, CommentModel, DefaultCommentService, ICommentService } from './index.js';
import { types } from '@typegoose/typegoose';
import { Component } from '../../const/index.js';

export function createCommentContainer() {
  const commentContainer = new Container();

  commentContainer.bind<ICommentService>(Component.CommentService).to(DefaultCommentService).inSingletonScope();

  commentContainer.bind<types.ModelType<CommentEntity>>(Component.CommentModel).toConstantValue(CommentModel);

  return commentContainer;
}
