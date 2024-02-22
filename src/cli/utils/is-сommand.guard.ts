/* eslint-disable @typescript-eslint/no-explicit-any */
import { FUNCTION } from '../../shared/const/index.js';
import { ICommand } from '../commands/command.interface.js';

export function isCommand(obj: any): obj is { new (...args: unknown[]): ICommand } {
  return typeof obj === FUNCTION && obj.prototype && typeof obj.prototype.execute === FUNCTION;
}
