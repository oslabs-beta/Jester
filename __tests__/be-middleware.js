const testsController = require('../server/controllers/testsController');

// Unit test to check if the middleware testFunc is working.
describe('testsController unit tests', () => {
  describe('test', () => {
    it('returns 1', () => {
      const result = testsController.testFunc(2);
      expect(result).toEqual(4);
    });
  });
});
