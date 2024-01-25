import { ICommand } from '../commands/command.interface.js';

export function isCommand(obj: unknown): obj is { new (...args: unknown[]): ICommand } {
  return typeof obj === 'function' && obj.prototype && typeof obj.prototype.execute === 'function';
}
