import { ICommand } from './command.interface.js';
import chalk from 'chalk';

export class HelpCommand implements ICommand {
  public getName(): string {
    return '--help';
  }

  public async execute(..._parameters: string[]): Promise<void> {
    console.info(`
       ${chalk.blue(' Программа для подготовки данных для REST API сервера.')}
        Пример:
            cli.js --<command> [--arguments]
        Команды:
            ${chalk.gray('--version:')}                   # выводит номер версии
            ${chalk.gray('--help:')}                      # печатает этот текст
            ${chalk.gray('--import <path>:')}             # импортирует данные из TSV
            ${chalk.gray('--generate <n> <path> <url>:')} # генерирует произвольное количество тестовых данных
    `);
  }
}
