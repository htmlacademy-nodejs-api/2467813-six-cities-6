import { Container } from 'inversify';
import { DefaultOfferService, IOfferService, OfferEntity, OfferModel } from './index.js';
import { Component } from '../../const/index.js';
import { types } from '@typegoose/typegoose';

export function createOfferContainer() {
  const offerContainer = new Container();

  offerContainer.bind<IOfferService>(Component.OfferService).to(DefaultOfferService);
  offerContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);

  return offerContainer;
}
