#!/usr/bin/env node
/* eslint-disable node/no-unsupported-features/es-syntax */
import { resolve, sep } from 'node:path';
import { ICommand } from './cli/commands/command.interface.js';
import { CLIApplication } from './cli/index.js';
import { glob } from 'glob';
import { isICommand } from './cli/utils/index.js';
import { PATH_COMMAND } from './cli/const/index.js';

async function bootstrap() {
  const cliApplication = new CLIApplication();

  const importedCommands: ICommand[] = [];
  const files = glob.sync(PATH_COMMAND);

  for (const file of files) {
    const absoluteFilePath = resolve(file);
    const normalizedModulePath = absoluteFilePath.split(sep).join('/');

    const commandModule = await import(normalizedModulePath);

    Object.keys(commandModule).forEach((key) => {
      const CommandClass = commandModule[key];

      if (isICommand(CommandClass)) {
        const commandInstance = new CommandClass();
        importedCommands.push(commandInstance);
      } else {
        console.error('Объект не реализует интерфейс ICommand:', CommandClass);
      }
    });
  }

  cliApplication.registerCommands(importedCommands);
  cliApplication.processCommand(process.argv);
}

bootstrap();
