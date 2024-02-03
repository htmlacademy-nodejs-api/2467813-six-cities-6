import chalk from 'chalk';
import { TSVFileReader } from '../../shared/libs/file-rider/index.js';
import { TOffer } from '../../shared/types/index.js';
import { createOffer, getMongoURI, isError } from '../../shared/utils/index.js';
import { COMMANDS, DEFAULT_DB_PORT, DEFAULT_USER_PASSWORD } from '../const/index.js';
import { ICommand } from './command.interface.js';
// import { table } from '../config/index.js';
import { DefaultUserService, IUserService, UserModel } from '../../shared/modules/user/index.js';
import { DefaultOfferService, IOfferService, OfferModel } from '../../shared/modules/offer/index.js';
import { IDatabaseClient, MongoDatabaseClient } from '../../shared/libs/database-client/index.js';
import { ConsoleLogger, ILogger } from '../../shared/libs/logger/index.js';
// import Table from 'cli-table';

export class ImportCommand implements ICommand {
  // private listOffers: TOffer[] = [];
  private userService: IUserService;
  private offerService: IOfferService;
  private databaseClient: IDatabaseClient;
  private logger: ILogger;
  private salt: string;
  // private table: Table;

  constructor() {
    this.onImportedLine = this.onImportedLine.bind(this);
    this.onCompleteImport = this.onCompleteImport.bind(this);

    // this.table = table;
    this.logger = new ConsoleLogger();
    this.offerService = new DefaultOfferService(this.logger, OfferModel);
    this.userService = new DefaultUserService(this.logger, UserModel);
    this.databaseClient = new MongoDatabaseClient(this.logger);
  }

  public getName(): string {
    return COMMANDS.import;
  }

  private async onImportedLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    // console.info(offer);
    await this.saveOffer(offer);
    // this.listOffers.push(offer);
    resolve();
  }

  private onCompleteImport(count: number) {
    this.logger.info(`${chalk.green(count)} rows imported.`);
    // this.showTable(this.listOffers);
    this.databaseClient.disconnect();
  }

  private async saveOffer(offer: TOffer) {
    const user = await this.userService.findOrCreate(
      {
        ...offer.author,
        password: DEFAULT_USER_PASSWORD,
      },
      this.salt,
    );

    await this.offerService.create({
      userId: user.id,
      title: offer.title,
      description: offer.description,
      publicationDate: offer.publicationDate,
      city: offer.city,
      previewImage: offer.previewImage,
      listImages: offer.listImages,
      isPremium: offer.isPremium,
      isFavorite: offer.isFavorite,
      rating: offer.rating,
      houseType: offer.houseType,
      rooms: offer.rooms,
      guests: offer.guests,
      rentalCost: offer.rentalCost,
      amenities: offer.amenities,
      latitude: offer.coordinates.latitude,
      longitude: offer.coordinates.longitude,
    });
  }

  public async execute(
    filename: string,
    login: string,
    password: string,
    host: string,
    dbName: string,
    salt: string,
  ): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbName);
    this.salt = salt;

    await this.databaseClient.connect(uri);

    const fileReader = new TSVFileReader(filename.trim());

    fileReader.on('row', this.onImportedLine);
    fileReader.on('end', this.onCompleteImport);

    try {
      fileReader.read();
    } catch (err) {
      if (isError(err)) {
        this.logger.error(`Can't import data from file: ${filename}`, err);
        this.logger.error(`Details: ${err.message}`, err);
      } else {
        throw err;
      }
    }
  }
  // npm run cli -- --import ./mocks/mock-data.tsv admin test localhost six_cities secret
  // npm run cli -- --import ./mocks/mock-data.tsv admin test 127.0.0.1 six_cities secret
  // private showTable(data: TOffer[]) {
  //   data.forEach((t) => {
  //     table.push([
  //       String(t.title),
  //       String(t.description),
  //       String(t.publicationDate),
  //       String(t.city),
  //       String(t.rating),
  //       String(t.houseType),
  //       String(t.rooms),
  //       String(t.guests),
  //       String(t.isPremium),
  //       String(t.isFavorite),
  //       String(t.rentalCost),
  //       String(t.author.name),
  //       String(t.author.email),
  //     ]);
  //   });

  //   console.log(table.toString());
  // }
}
