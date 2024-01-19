#!/usr/bin/env node
/* eslint-disable node/no-unsupported-features/es-syntax */
import { resolve, sep } from 'node:path';
import { ICommand } from './cli/commands/command.interface.js';
import { CLIApplication } from './cli/index.js';
import { glob } from 'glob';
import { isICommand } from './cli/utils/index.js';

async function bootstrap() {
  const cliApplication = new CLIApplication();

  const importedCommands: ICommand[] = [];
  const files = glob.sync('./src/cli/commands/*.command.ts');

  for (const file of files) {
    const absoluteFilePath = resolve(file);
    const normalizedModulePath = absoluteFilePath.split(sep).join('/');

    const commandModule = await import(normalizedModulePath);
    const CommandClass = commandModule.default || Object.values(commandModule)[0];

    if (typeof CommandClass === 'function') {
      const commandInstance = new CommandClass();

      if (isICommand(commandInstance)) {
        importedCommands.push(commandInstance);
      } else {
        console.error('Объект не реализует интерфейс ICommand:', commandInstance);
      }
    }
  }

  cliApplication.registerCommands(importedCommands);
  cliApplication.processCommand(process.argv);
}

bootstrap();
