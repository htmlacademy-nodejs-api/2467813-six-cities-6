import { Logger as PinoInstance, pino, transport } from 'pino';
import { ILogger } from './logger.interface.js';
import { getCurrentModuleDirectoryPath } from '../../utils/index.js';
import { resolve } from 'node:path';
import { LOG_FILE_PATH } from '../../const/index.js';
import { rimraf } from 'rimraf';

export class PinoLogger implements ILogger {
  private readonly logger: PinoInstance;

  constructor() {
    const modulePath = getCurrentModuleDirectoryPath();
    const logFilePath = LOG_FILE_PATH;
    const destination = resolve(modulePath, '../../../', logFilePath);
    rimraf(destination);

    const multiTransport = transport({
      targets: [
        {
          target: 'pino/file',
          options: { destination },
          level: 'debug',
        },
        {
          target: 'pino/file',
          level: 'info',
          options: {},
        },
      ],
    });

    this.logger = pino(
      {
        timestamp: pino.stdTimeFunctions.isoTime,
      },
      multiTransport,
    );
  }

  public debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }

  public error(message: string, error: Error, ...args: unknown[]): void {
    this.logger.error(error, message, ...args);
  }

  public info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }
}
