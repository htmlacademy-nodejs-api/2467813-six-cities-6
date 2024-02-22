import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDto, OfferEntity } from './index.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';
import { IDocumentExists } from '../../libs/rest/index.js';

export interface IOfferService extends IDocumentExists {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  find(
    count?: number,
    city?: string,
    premium?: boolean,
    favorite?: boolean,
    userId?: string,
  ): Promise<DocumentType<OfferEntity>[]>;
  findById(offerId: string, userId?: string): Promise<DocumentType<OfferEntity> | null>;
  togglerFavorites(userId: string, offerId: string, isFavorite: boolean): Promise<boolean>;

  // Существование документа в базе данных
  exists(documentId: string): Promise<boolean>;
}
