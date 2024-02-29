import dayjs from 'dayjs';
import { IOfferGenerator } from './offer-generator.interface.js';
import { TMockServerData } from '../../types/index.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../utils/index.js';
import { AmenitiesType, CityType, Guests, HouseType, Price, Rating, Rooms, UserType } from '../../const/index.js';

const WeekDay = {
  First: 1,
  Last: 7,
} as const;

export class TSVOfferGenerator implements IOfferGenerator {
  constructor(private readonly mockData: TMockServerData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);
    const createdDate = dayjs().subtract(generateRandomValue(WeekDay.First, WeekDay.Last), 'day').toISOString();
    const city = getRandomItem([
      CityType.Paris,
      CityType.Cologne,
      CityType.Brussels,
      CityType.Amsterdam,
      CityType.Hamburg,
      CityType.Dusseldorf,
    ]);
    const previewImage = getRandomItem<string>(this.mockData.previewImage);
    const listImages = this.mockData.listImages.join(';');
    const isPremium = getRandomItem<boolean>(this.mockData.isPremium).toString();
    const isFavorite = getRandomItem<boolean>(this.mockData.isFavorite).toString();
    const rating = generateRandomValue(Rating.Min, Rating.Max, 1).toString();
    const houseType = getRandomItem([HouseType.apartment, HouseType.house, HouseType.room, HouseType.hotel]);
    const room = generateRandomValue(Rooms.Min, Rooms.Max).toString();
    const guest = generateRandomValue(Guests.Min, Guests.Max).toString();
    const rentalCost = generateRandomValue(Price.Min, Price.Max).toString();
    const amenities = getRandomItems<string>([
      AmenitiesType.Breakfast,
      AmenitiesType['Air conditioning'],
      AmenitiesType['Laptop friendly workspace'],
      AmenitiesType['Baby seat'],
      AmenitiesType.Washer,
      AmenitiesType.Towels,
      AmenitiesType.Fridge,
    ]).join(';');
    const name = getRandomItem(this.mockData.name);
    const email = getRandomItem(this.mockData.emails);
    const avatarPath = getRandomItem(this.mockData.avatarPath);
    const userType = getRandomItem([UserType.simple, UserType.pro]);
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
