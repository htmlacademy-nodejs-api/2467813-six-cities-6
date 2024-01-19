#!/usr/bin/env node
/* eslint-disable node/no-unsupported-features/es-syntax */
import { resolve } from 'node:path';
import { ICommand } from './cli/commands/command.interface.js';
import { CLIApplication } from './cli/index.js';
import { glob } from 'glob';

async function bootstrap() {
  const cliApplication = new CLIApplication();

  const importedCommands: ICommand[] = [];
  const files = glob.sync('./src/cli/commands/*.command.ts');

  for (const file of files) {
    const modulePath = resolve(file);

    const { default: CommandClass } = await import(modulePath);

    // Для оптимизации можно сделать доп проверки на прототайп объект и есть метод execute
    // if (typeof CommandClass === 'function') {
    const commandInstance = new CommandClass();
    importedCommands.push(commandInstance);
    // }
  }

  cliApplication.registerCommands(importedCommands);

  cliApplication.processCommand(process.argv);
}

bootstrap();
