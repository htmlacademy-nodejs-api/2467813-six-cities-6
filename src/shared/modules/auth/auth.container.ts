import { Container } from 'inversify';
import { DefaultAuthService, IAuthService } from './index.js';
import { Component } from '../../const/index.js';
import { IExceptionFilter } from '../../libs/rest/index.js';
import { AuthExceptionFilter } from './errors/index.js';

export function createAuthContainer() {
  const authContainer = new Container();
  authContainer.bind<IAuthService>(Component.AuthService).to(DefaultAuthService).inSingletonScope();
  authContainer.bind<IExceptionFilter>(Component.AuthExceptionFilter).to(AuthExceptionFilter).inSingletonScope();

  return authContainer;
}
