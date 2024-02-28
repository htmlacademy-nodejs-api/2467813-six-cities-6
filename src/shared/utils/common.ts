import { ClassConstructor, plainToInstance } from 'class-transformer';
import { TApplicationError, TValidationErrorField } from '../libs/rest/index.js';
import { ValidationError } from 'class-validator';

// для получения случайного числа в диапазоне
export function generateRandomValue(min: number, max: number, numAfterDigit = 0) {
  return +(Math.random() * (max - min) + min).toFixed(numAfterDigit);
}

// для получения случайных элементов массива
export function getRandomItems<T>(items: T[]): T[] {
  const startPosition = generateRandomValue(0, items.length - 1);
  const endPosition = startPosition + generateRandomValue(startPosition, items.length);
  return items.slice(startPosition, endPosition);
}

// для получения случайного элемента массива
export function getRandomItem<T>(items: T[]): T {
  return items[generateRandomValue(0, items.length - 1)];
}

export function isError(error: unknown): error is Error {
  return error instanceof Error;
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}

export function fillDTO<T, V>(someDto: ClassConstructor<T>, plainObject: V) {
  return plainToInstance(someDto, plainObject, {
    excludeExtraneousValues: true,
    enableImplicitConversion: true,
  });
}

export function createErrorObject(errorType: TApplicationError, error: string, details: TValidationErrorField[] = []) {
  return {
    errorType,
    error,
    details,
  };
}

export function reduceValidationErrors(errors: ValidationError[]): TValidationErrorField[] {
  return errors.map(({ property, value, constraints }) => ({
    property,
    value,
    messages: constraints ? Object.values(constraints) : [],
  }));
}
