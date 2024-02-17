import { DocumentType } from '@typegoose/typegoose';
import { CreateOfferDto, OfferEntity } from './index.js';
import { UpdateOfferDto } from './dto/update-offer.dto.js';

export interface IOfferService {
  create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>>;
  updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null>;
  deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  find(count?: number): Promise<DocumentType<OfferEntity>[]>;
  findById(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  findPremium(): Promise<DocumentType<OfferEntity>[]>;
  findFavorites(): Promise<DocumentType<OfferEntity>[]>;
  togglerFavorites(userId: string, offerId: string): Promise<boolean>;

  // Инкремент комментария
  incCommentCount(offerId: string): Promise<DocumentType<OfferEntity> | null>;
  // Существование документа в базе данных
  exists(documentId: string): Promise<boolean>;
}
