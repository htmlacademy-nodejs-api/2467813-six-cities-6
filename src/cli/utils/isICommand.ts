import { ICommand } from '../commands/command.interface.js';

export function isICommand(obj: unknown): obj is ICommand {
  return (
    typeof obj === 'object' &&
    typeof (obj as ICommand).getName === 'function' &&
    typeof (obj as ICommand).execute === 'function'
  );
}
