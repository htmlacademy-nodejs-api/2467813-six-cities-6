import { Container } from 'inversify';
import { Component } from '../../const/index.js';
import { DefaultUserService, IUserService, UserEntity, UserModel } from './index.js';
import { types } from '@typegoose/typegoose';

export function createUserContainer() {
  const userContainer = new Container();
  userContainer.bind<IUserService>(Component.UserService).to(DefaultUserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);

  return userContainer;
}
