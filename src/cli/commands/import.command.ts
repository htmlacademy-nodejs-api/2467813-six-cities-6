import { table } from '../../shared/config/index.js';
import { TSVFileReader } from '../../shared/libs/file-rider/index.js';
import { TOffer } from '../../shared/types/index.js';
import { COMMANDS } from '../const/index.js';
import { ICommand } from './command.interface.js';

export default class ImportCommand implements ICommand {
  public getName(): string {
    return COMMANDS.import;
  }

  public execute(...parameters: string[]): void {
    const [filename] = parameters;
    const fileReader = new TSVFileReader(filename.trim());

    try {
      fileReader.read();
      console.log(fileReader.toArray());
      this.showTable(fileReader.toArray());
    } catch (err) {
      if (!(err instanceof Error)) {
        throw err;
      }

      console.error(`Can't import data from file: ${filename}`);
      console.error(`Details: ${err.message}`);
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
