/* eslint-disable indent */
import { Commands } from '../const/index.js';
import { ICommand } from './command.interface.js';
import chalk from 'chalk';

export class HelpCommand implements ICommand {
  public getName(): string {
    return Commands.help;
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
       ${chalk.blue(' Программа для подготовки данных для REST API сервера.')}
        Пример:
            cli.js --<command> [--arguments]
        Команды:
            ${chalk.gray(
              `${Commands.version}:`,
            )}                                                      # выводит номер версии
            ${chalk.gray(
              `${Commands.help}:`,
            )}                                                         # печатает этот текст
            ${chalk.gray(
              `${Commands.import} <path> <db_login> <db_password> <db_host> <db_name>:`,
            )}   # импортирует данные из файла TSV в базу данных
            ${chalk.gray(
              `${Commands.generate} <n> <path> <url>:`,
            )}                                    # генерирует произвольное количество тестовых данных
    `);
  }
}
