export const DEFAULT_PROJECT = 'Project One';

export const boilerplate_start = (server) => { 
  return [
  "const request = require('supertest');\n",
  `const server = '${server}';\n\n`,
  "describe('Route Integration Testing'), ( ) => {\n",
  ];
}

export const BOILERPLATE_END = '});'

export const DEFAULT_CLIPBOARD= 'Your Clipboard is currently empty! Please generate a test before we can display your testing code here.';