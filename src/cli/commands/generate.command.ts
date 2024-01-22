import got from 'got';
import { appendFile } from 'node:fs/promises';
import { DECIMAL_SYSTEM } from '../../shared/const/const.js';
import { TMockServerData } from '../../shared/types/index.js';
import { COMMANDS } from '../const/index.js';
import { ICommand } from './command.interface.js';
import { TSVOfferGenerator } from '../../shared/libs/offer-generator/index.js';
import chalk from 'chalk';

export class GenerateCommand implements ICommand {
  private initialData: TMockServerData;

  private async load(url: string) {
    try {
      this.initialData = await got.get(url).json();
    } catch {
      throw new Error(`Can't load data from ${url}`);
    }
  }

  private async write(filepath: string, offerCount: number) {
    const tsvOfferGenerator = new TSVOfferGenerator(this.initialData);
    for (let i = 0; i < offerCount; i++) {
      await appendFile(filepath, `${tsvOfferGenerator.generate()}\n`, { encoding: 'utf8' });
    }
  }

  public getName(): string {
    return COMMANDS.generate;
  }

  public async execute(...parameters: string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, DECIMAL_SYSTEM);

    try {
      await this.load(url);
      await this.write(filepath, offerCount);

      console.info(chalk.green(`File ${filepath} was created!`));
    } catch (error: unknown) {
      console.error('Can`t generate data');

      if (error instanceof Error) {
        console.error(error.message);
      }
    }
  }
}
