import { inject, injectable } from 'inversify';
import { IConfig, TRestSchema } from '../shared/config/index.js';
import { ILogger } from '../shared/libs/logger/index.js';
import { Component } from '../shared/const/index.js';
import { IDatabaseClient } from '../shared/libs/database-client/index.js';
import { getMongoURI } from '../shared/utils/index.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.Config) private readonly config: IConfig<TRestSchema>,
    @inject(Component.DatabaseClient) private readonly databaseClient: IDatabaseClient,
  ) {}

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

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    this.logger.info('Init database...');
    await this.initDb();
    this.logger.info('Init database completed.');
  }
}
