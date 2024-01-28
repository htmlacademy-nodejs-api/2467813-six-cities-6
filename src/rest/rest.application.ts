import { inject, injectable } from 'inversify';
import { IConfig, TRestSchema } from '../shared/config/index.js';
import { ILogger } from '../shared/libs/logger/index.js';
import { Component } from '../shared/const/index.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: ILogger,
    @inject(Component.Config) private readonly config: IConfig<TRestSchema>,
  ) {}

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
  }
}
