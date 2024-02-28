import { inject, injectable } from 'inversify';
import { IConfig, TRestSchema } from '../shared/config/index.js';
import { ILogger } from '../shared/libs/logger/index.js';
import { AppRoutes, Component, StaticPath } from '../shared/const/index.js';
import { IDatabaseClient } from '../shared/libs/database-client/index.js';
import { getFullServerPath, getMongoURI } from '../shared/utils/index.js';
import express, { Express } from 'express';
import { IController, IExceptionFilter } from '../shared/libs/rest/index.js';
import { ParseTokenMiddleware } from '../shared/libs/rest/middleware/parse-token.middleware.js';
import cors from 'cors';

@injectable()
export class RestApplication {
  private readonly server: Express;
  private readonly portApp: number;
  private readonly hostApp: string;

  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.Config) private readonly config: IConfig<TRestSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: IDatabaseClient,
    @inject(Component.ExceptionFilter) private readonly appExceptionFilter: IExceptionFilter,
    @inject(Component.UserController) private readonly userController: IController,
    @inject(Component.OfferController) private readonly offerController: IController,
    @inject(Component.CommentController) private readonly commentController: IController,
    @inject(Component.AuthExceptionFilter) private readonly authExceptionFilter: IExceptionFilter,
    @inject(Component.HttpExceptionFilter) private readonly httpExceptionFilter: IExceptionFilter,
    @inject(Component.ValidationExceptionFilter) private readonly validationExceptionFilter: IExceptionFilter,
  ) {
    this.hostApp = this.config.get('HOST');
    this.portApp = this.config.get('PORT');
    this.server = express();
  }

  private async initDb(): Promise<void> {
    const mongoUri = getMongoURI(
      this.config.get('DB_MONGO_USER'),
      this.config.get('DB_MONGO_PASSWORD'),
      this.config.get('DB_MONGO_HOST'),
      this.config.get('DB_MONGO_PORT'),
      this.config.get('DB_MONGO_NAME'),
    );

    return this.databaseClient.connect(mongoUri);
  }

  private async initMiddleware() {
    const authenticateMiddleware = new ParseTokenMiddleware(this.config.get('JWT_SECRET'));

    this.server.use(express.json());
    this.server.use(StaticPath.Upload, express.static(this.config.get('UPLOAD_DIRECTORY')));
    this.server.use(StaticPath.Files, express.static(this.config.get('STATIC_DIRECTORY_PATH')));
    this.server.use(authenticateMiddleware.execute.bind(authenticateMiddleware));
    this.server.use(cors());
  }

  private async initExceptionFilters() {
    this.server.use(this.authExceptionFilter.catch.bind(this.authExceptionFilter));
    this.server.use(this.validationExceptionFilter.catch.bind(this.validationExceptionFilter));
    this.server.use(this.httpExceptionFilter.catch.bind(this.httpExceptionFilter));
    this.server.use(this.appExceptionFilter.catch.bind(this.appExceptionFilter));
  }

  private async initControllers() {
    this.server.use(`/${AppRoutes.Users}`, this.userController.router);
    this.server.use(`/${AppRoutes.Offers}`, this.offerController.router);
    this.server.use(`/${AppRoutes.Comments}`, this.commentController.router);
  }

  private async initServer() {
    this.server.listen(this.portApp);
  }

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $HOST: ${this.hostApp}`);
    this.logger.info(`Get value from env $PORT: ${this.portApp}`);

    this.logger.info('Init database...');
    await this.initDb();
    this.logger.info('Init database completed.');

    this.logger.info('Init app-level middleware');
    await this.initMiddleware();
    this.logger.info('App-level middleware initialization completed');

    this.logger.info('Init controllers');
    await this.initControllers();
    this.logger.info('Controller initialization completed');

    this.logger.info('Init exception filters');
    await this.initExceptionFilters();
    this.logger.info('Exception filters initialization completed');

    this.logger.info('Try to init server...');
    await this.initServer();
    this.logger.info(`Server started on ${getFullServerPath(this.hostApp, this.portApp)}`);
  }
}
