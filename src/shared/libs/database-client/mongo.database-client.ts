import * as Mongoose from 'mongoose';
import { inject, injectable } from 'inversify';
import { IDatabaseClient } from './database-client.interface.js';
import { ILogger } from '../logger/index.js';
import { Component, Retry } from '../../const/index.js';
import { setTimeout } from 'node:timers/promises';

@injectable()
export class MongoDatabaseClient implements IDatabaseClient {
  private mongoose: typeof Mongoose;
  private isConnected: boolean = false;

  constructor(@inject(Component.Logger) private readonly logger: ILogger) {}

  public isConnectedToDatabase() {
    return this.isConnected;
  }

  public async connect(uri: string): Promise<void> {
    if (this.isConnectedToDatabase()) {
      throw new Error('MongoDB client already connected');
    }

    this.logger.info('Trying to connect to MongoDB...');
    await this.retryConnect(uri);
  }

  private async retryConnect(uri: string): Promise<void> {
    let attempt = 0;
    while (attempt < Retry.count) {
      try {
        this.mongoose = await Mongoose.connect(uri);
        this.isConnected = true;
        this.logger.info('Database connection established.');
        return;
      } catch (error) {
        attempt++;
        this.logger.error(`Failed to connect to the database. Attempt ${attempt}`, error as Error);
        await setTimeout(Retry.timeout);
      }
    }

    throw new Error(`Unable to establish database connection after ${Retry.count}`);
  }

  public async disconnect(): Promise<void> {
    if (!this.isConnectedToDatabase()) {
      throw new Error('Not connected to the database');
    }

    await this.mongoose.disconnect?.();
    this.isConnected = false;
    this.logger.info('Database connection closed.');
  }
}
