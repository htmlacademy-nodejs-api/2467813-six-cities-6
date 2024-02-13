import { Container } from 'inversify';
import { Component } from '../../const/index.js';
import { DefaultUserService, IUserService, UserController, UserEntity, UserModel } from './index.js';
import { types } from '@typegoose/typegoose';
import { IController } from '../../libs/rest/index.js';

export function createUserContainer() {
  const userContainer = new Container();
  userContainer.bind<IUserService>(Component.UserService).to(DefaultUserService).inSingletonScope();
  userContainer.bind<types.ModelType<UserEntity>>(Component.UserModel).toConstantValue(UserModel);
  userContainer.bind<IController>(Component.UserController).to(UserController).inSingletonScope();

  return userContainer;
}
