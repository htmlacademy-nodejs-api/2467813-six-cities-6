import chalk from 'chalk';
import { table } from '../../shared/config/index.js';
import { TSVFileReader } from '../../shared/libs/file-rider/index.js';
import { TOffer } from '../../shared/types/index.js';
import { createOffer, isErrorMessage } from '../../shared/utils/index.js';
import { COMMANDS } from '../const/index.js';
import { ICommand } from './command.interface.js';

export class ImportCommand implements ICommand {
  private listOffers: TOffer[] = [];

  public getName(): string {
    return COMMANDS.import;
  }

  private onImportedLine = (line: string) => {
    const offer = createOffer(line);
    console.info(offer);
    this.listOffers.push(offer);
  };

  private onCompleteImport = (count: number) => {
    console.info(`${chalk.green(count)} rows imported.`);
    this.showTable(this.listOffers);
  };

  public execute(...parameters: string[]): void {
    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('row', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      fileReader.read();
    } catch (err) {
      if (isErrorMessage(err)) {
        console.error(`Can't import data from file: ${filename}`);
        console.error(`Details: ${err.message}`);
      } else {
        throw err;
      }
    }
  }

  private showTable(data: TOffer[]) {
    data.forEach((t) => {
      table.push([
        String(t.title),
        String(t.description),
        String(t.publicationDate),
        String(t.city),
        String(t.rating),
        String(t.houseType),
        String(t.rooms),
        String(t.guests),
        String(t.isPremium),
        String(t.isFavorite),
        String(t.rentalCost),
        String(t.author.name),
        String(t.author.email),
      ]);
    });

    console.log(table.toString());
  }
}
