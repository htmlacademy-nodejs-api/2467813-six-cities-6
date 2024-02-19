import { Container } from 'inversify';
import { DefaultOfferService, IOfferService, OfferController, OfferEntity, OfferModel } from './index.js';
import { Component } from '../../const/index.js';
import { types } from '@typegoose/typegoose';
import { IController } from '../../libs/rest/index.js';

export function createOfferContainer() {
  const offerContainer = new Container();

  offerContainer.bind<IOfferService>(Component.OfferService).to(DefaultOfferService);
  offerContainer.bind<types.ModelType<OfferEntity>>(Component.OfferModel).toConstantValue(OfferModel);
  offerContainer.bind<IController>(Component.OfferController).to(OfferController).inSingletonScope();

  return offerContainer;
}
