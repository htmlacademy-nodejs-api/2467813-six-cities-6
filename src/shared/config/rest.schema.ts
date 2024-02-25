import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type TRestSchema = {
  PORT: number;
  SALT: string;
  DB_MONGO_HOST: string;
  DB_MONGO_USER: string;
  DB_MONGO_PASSWORD: string;
  DB_MONGO_PORT: string;
  DB_MONGO_NAME: string;
  UPLOAD_DIRECTORY: string;
  JWT_SECRET: string;
};

export const configRestSchema = convict<TRestSchema>({
  PORT: {
    doc: 'Port for incoming connections',
    format: 'port',
    env: 'PORT',
    default: 4000,
  },
  SALT: {
    doc: 'Salt for password hash',
    format: String,
    env: 'SALT',
    default: null,
  },
  DB_MONGO_HOST: {
    doc: 'IP address of the database server (MongoDB)',
    format: 'ipaddress',
    env: 'DB_MONGO_HOST',
    default: '127.0.0.1',
  },
  DB_MONGO_USER: {
    doc: 'Username to connect to the database',
    format: String,
    env: 'DB_MONGO_USER',
    default: null,
  },
  DB_MONGO_PASSWORD: {
    doc: 'Password to connect to the database',
    format: String,
    env: 'DB_MONGO_PASSWORD',
    default: null,
  },
  DB_MONGO_PORT: {
    doc: 'Port to connect to the database (MongoDB)',
    format: 'port',
    env: 'DB_MONGO_PORT',
    default: '27017',
  },
  DB_MONGO_NAME: {
    doc: 'Database name (MongoDB)',
    format: String,
    env: 'DB_MONGO_NAME',
    default: 'six_cities',
  },
  UPLOAD_DIRECTORY: {
    doc: 'Directory for upload files',
    format: String,
    env: 'UPLOAD_DIRECTORY',
    default: null,
  },
  JWT_SECRET: {
    doc: 'Secret for sign JWT',
    format: String,
    env: 'JWT_SECRET',
    default: null,
  },
});
