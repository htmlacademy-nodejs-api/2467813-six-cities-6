import dayjs from 'dayjs';
import { IOfferGenerator } from './offer-generator.interface.js';
import { TMockServerData } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../utils/index.js';
import { AMENITIES_TYPE, CITY_TYPE, HOUSE_TYPE, USER_TYPE } from '../../const/index.js';

const MIN_PRICE = 100;
const MAX_PRICE = 100000;

const MIN_RATING = 1;
const MAX_RATING = 5;

const MIN_ROOM = 1;
const MAX_ROOM = 8;

const MIN_GUEST = 1;
const MAX_GUEST = 10;

const FIRST_WEEK_DAY = 1;
const LAST_WEEK_DAY = 7;

export class TSVOfferGenerator implements IOfferGenerator {
  constructor(private readonly mockData: TMockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const createdDate = dayjs().subtract(generateRandomValue(FIRST_WEEK_DAY, LAST_WEEK_DAY), 'day').toISOString();
    const city = getRandomItem([
      CITY_TYPE.Paris,
      CITY_TYPE.Cologne,
      CITY_TYPE.Brussels,
      CITY_TYPE.Amsterdam,
      CITY_TYPE.Hamburg,
      CITY_TYPE.Dusseldorf,
    ]);
    const previewImage = getRandomItem<string>(this.mockData.previewImage);
    const listImages = this.mockData.listImages.join(';');
    const isPremium = getRandomItem<boolean>(this.mockData.isPremium).toString();
    const isFavorite = getRandomItem<boolean>(this.mockData.isFavorite).toString();
    const rating = generateRandomValue(MIN_RATING, MAX_RATING, 1).toString();
    const houseType = getRandomItem([HOUSE_TYPE.apartment, HOUSE_TYPE.house, HOUSE_TYPE.room, HOUSE_TYPE.hotel]);
    const room = generateRandomValue(MIN_ROOM, MAX_ROOM).toString();
    const guest = generateRandomValue(MIN_GUEST, MAX_GUEST).toString();
    const rentalCost = generateRandomValue(MIN_PRICE, MAX_PRICE).toString();
    const amenities = getRandomItems<string>([
      AMENITIES_TYPE.Breakfast,
      AMENITIES_TYPE['Air conditioning'],
      AMENITIES_TYPE['Laptop friendly workspace'],
      AMENITIES_TYPE['Baby seat'],
      AMENITIES_TYPE.Washer,
      AMENITIES_TYPE.Towels,
      AMENITIES_TYPE.Fridge,
    ]).join(';');
    const name = getRandomItem(this.mockData.name);
    const email = getRandomItem(this.mockData.emails);
    const avatarPath = getRandomItem(this.mockData.avatarPath);
    const userType = getRandomItem([USER_TYPE.simple, USER_TYPE.pro]);
    const coordinates = getRandomItem(this.mockData.coordinates);

    return [
      title,
      description,
      createdDate,
      city,
      previewImage,
      listImages,
      isPremium,
      isFavorite,
      rating,
      houseType,
      room,
      guest,
      rentalCost,
      amenities,
      name,
      email,
      avatarPath,
      userType,
      coordinates,
    ].join('\t');
  }
}
