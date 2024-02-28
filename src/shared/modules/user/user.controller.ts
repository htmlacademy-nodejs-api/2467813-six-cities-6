import { inject, injectable } from 'inversify';
import {
  BaseController,
  HttpError,
  UploadFileMiddleware,
  ValidateDtoMiddleware,
  ValidateObjectIdMiddleware,
} from '../../libs/rest/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { Component, HttpMethod, Path } from '../../const/index.js';
import { Request, Response } from 'express';
import {
  CreateUserDto,
  CreateUserRequest,
  IUserService,
  LoggedUserRdo,
  LoginUserDto,
  LoginUserRequest,
  UploadUserAvatarRdo,
  UserRdo,
} from './index.js';
import { IConfig, TRestSchema } from '../../config/index.js';
import { StatusCodes } from 'http-status-codes';
import { fillDTO } from '../../utils/index.js';
import { USER_CONTROLLER } from './const/index.js';
import { IAuthService } from '../auth/index.js';
import { PrivateRouteMiddleware } from '../../libs/rest/middleware/private-route.middleware.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
    @inject(Component.UserService) private readonly userService: IUserService,
    @inject(Component.Config) private readonly config: IConfig<TRestSchema>,
    @inject(Component.AuthService) private readonly authService: IAuthService,
  ) {
    super(logger);
    this.logger.info(`Register routes for ${USER_CONTROLLER}...`);

    this.addRoute({
      path: `/${Path.Register}/`,
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [new ValidateDtoMiddleware(CreateUserDto)],
    });
    this.addRoute({
      path: `/${Path.Login}/`,
      method: HttpMethod.Post,
      handler: this.login,
      middlewares: [new ValidateDtoMiddleware(LoginUserDto)],
    });
    this.addRoute({
      path: `/${Path.Login}/`,
      method: HttpMethod.Get,
      handler: this.checkAuthenticate,
      middlewares: [new PrivateRouteMiddleware()],
    });
    this.addRoute({
      path: '/:id/avatar/',
      method: HttpMethod.Post,
      handler: this.uploadAvatar,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('id'),
        new UploadFileMiddleware(this.config.get('UPLOAD_DIRECTORY'), 'avatar'),
      ],
    });
  }

  public async create({ body }: CreateUserRequest, res: Response): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(StatusCodes.CONFLICT, `User with email «${body.email}» exists.`, `${USER_CONTROLLER}`);
    }

    const user = await this.userService.create(body, this.config.get('SALT'));
    this.created(res, fillDTO(UserRdo, user));
  }

  public async login({ body }: LoginUserRequest, res: Response): Promise<void> {
    const user = await this.authService.verify(body);
    const token = await this.authService.authenticate(user);

    const responseData = fillDTO(LoggedUserRdo, user);
    this.ok(res, Object.assign(responseData, { token }));
  }

  public async checkAuthenticate({ tokenPayload: { email } }: Request, res: Response): Promise<void> {
    const foundedUser = await this.userService.findByEmail(email);

    if (!foundedUser) {
      throw new HttpError(StatusCodes.UNAUTHORIZED, 'Unauthorized', `${USER_CONTROLLER}`);
    }

    this.ok(res, fillDTO(UserRdo, foundedUser));
  }

  public async uploadAvatar({ params, file }: Request, res: Response) {
    const { id } = params;
    const uploadFile = { avatarPath: file?.filename };
    await this.userService.updateById(id, uploadFile);
    this.created(res, fillDTO(UploadUserAvatarRdo, { filepath: uploadFile.avatarPath }));
  }
}
