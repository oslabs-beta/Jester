const state = {
  codeOutput: `describe('Sample description', (arg1) => { code.. }`,
};

export const testUseAppSelector = (f) => f(state);