export const INDENT = '  ';

export const DEFAULT_PROJECT = 'Guest Project';

export const boilerplate_start = (server: string) => {
  return [
    'const request = require(\'supertest\');\n',
    `const server = '${server}';\n`,
    `${INDENT}\n`,
    'describe(\'Route Integration Testing\', ( ) => {\n',
  ];
};

export const BOILERPLATE_END = '});';

export const DEFAULT_CLIPBOARD =
  'Your Clipboard is currently empty!\nPlease generate a test before we can display your testing code here.';
