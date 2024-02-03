import chalk from 'chalk';
import { isError } from '../../utils/index.js';
import { ILogger } from './index.js';

export class ConsoleLogger implements ILogger {
  public debug(message: string, ...args: unknown[]): void {
    console.debug(message, ...args);
  }

  public error(message: string, error: Error, ...args: unknown[]): void {
    console.error(chalk.red(message), ...args);

    if (isError(error)) {
      console.error(`${chalk.red('Error message:')} ${error.message}`);
    }
  }

  public info(message: string, ...args: unknown[]): void {
    console.info(message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    console.warn(chalk.yellow(message), ...args);
  }
}
