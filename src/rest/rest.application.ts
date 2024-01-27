import { IConfig, TRestSchema } from '../shared/config/index.js';
import { ILogger } from '../shared/libs/logger/index.js';

export class RestApplication {
  constructor(private readonly logger: ILogger, private readonly config: IConfig<TRestSchema>) {}

  public async init() {
    this.logger.info('Application initialization');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);
  }
}
