export const Commands = {
  help: '--help',
  version: '--version',
  import: '--import',
  generate: '--generate',
} as const;

export const PATH_COMMAND = 'src/cli/commands/*.command.ts';
export const DEFAULT_DB_PORT = '27017';
export const DEFAULT_USER_PASSWORD = '123456';
