import { inject, injectable } from 'inversify';
import { BaseController, HttpError } from '../../libs/rest/index.js';
import { ILogger } from '../../libs/logger/index.js';
import { Component, HttpMethod, Path } from '../../const/index.js';
import { Request, Response } from 'express';
import { CreateUserRequest, IUserService, LoginUserRequest, UserRdo } from './index.js';
import { IConfig, TRestSchema } from '../../config/index.js';
import { StatusCodes } from 'http-status-codes';
import { fillDTO } from '../../utils/index.js';
import { USER_CONTROLLER } from './const/index.js';

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(Component.Logger) protected readonly logger: ILogger,
    @inject(Component.UserService) private readonly userService: IUserService,
    @inject(Component.Config) private readonly config: IConfig<TRestSchema>,
  ) {
    super(logger);
    this.logger.info(`Register routes for ${USER_CONTROLLER}...`);

    this.addRoute({ path: `/${Path.Register}/`, method: HttpMethod.Post, handler: this.create });
    this.addRoute({ path: `/${Path.Login}/`, method: HttpMethod.Post, handler: this.login });
    this.addRoute({ path: `/${Path.Logout}/`, method: HttpMethod.Post, handler: this.logout });
    this.addRoute({ path: `/${Path.CheckAuth}/`, method: HttpMethod.Get, handler: this.checkAuth });
  }

  public async create({ body }: CreateUserRequest, res: Response): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (existsUser) {
      throw new HttpError(StatusCodes.CONFLICT, `User with email «${body.email}» exists.`, `${USER_CONTROLLER}`);
    }

    const result = await this.userService.create(body, this.config.get('SALT'));
    this.created(res, fillDTO(UserRdo, result));
  }

  public async login({ body }: LoginUserRequest, _res: Response): Promise<void> {
    const existsUser = await this.userService.findByEmail(body.email);

    if (!existsUser) {
      throw new HttpError(StatusCodes.UNAUTHORIZED, `User with email ${body.email} not found.`, `${USER_CONTROLLER}`);
    }

    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'Not implemented', `${USER_CONTROLLER}`);
  }

  public async logout(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'Not implemented', `${USER_CONTROLLER}`);
  }

  public async checkAuth(_req: Request, _res: Response): Promise<void> {
    throw new HttpError(StatusCodes.NOT_IMPLEMENTED, 'Not implemented', `${USER_CONTROLLER}`);
  }
}
