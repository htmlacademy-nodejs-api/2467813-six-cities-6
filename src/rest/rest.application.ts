import { inject, injectable } from 'inversify';
import { IConfig, TRestSchema } from '../shared/config/index.js';
import { ILogger } from '../shared/libs/logger/index.js';
import { AppRoutes, Component } from '../shared/const/index.js';
import { IDatabaseClient } from '../shared/libs/database-client/index.js';
import { getMongoURI } from '../shared/utils/index.js';
import express, { Express } from 'express';
import { IController, IExceptionFilter } from '../shared/libs/rest/index.js';

@injectable()
export class RestApplication {
  private readonly server: Express;
  private readonly portApp: number;

  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.Config) private readonly config: IConfig<TRestSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: IDatabaseClient,
    @inject(Component.ExceptionFilter) private readonly appExceptionFilter: IExceptionFilter,
    @inject(Component.UserController) private readonly userController: IController,
    @inject(Component.OfferController) private readonly offerController: IController,
    @inject(Component.CommentController) private readonly commentController: IController,
  ) {
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
    this.server.use(express.json());
  }

  private async initExceptionFilters() {
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
    this.logger.info(`Server started on http://localhost:${this.portApp}`);
  }
}
