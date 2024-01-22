/* eslint-disable @typescript-eslint/no-explicit-any */
import { ICommand } from '../commands/command.interface.js';

export function isCommand(obj: any): obj is { new (): ICommand } {
  return typeof obj === 'function' && obj.prototype && typeof obj.prototype.execute === 'function';
}
