const testsController = require('../server/controllers/testsController');
const helperFunctions = require('../server/helpers/functions.js');

describe('testsController middleware unit tests', () => {
  let mockRequest;
  let mockResponse;
  let nextFunction;

  // check if the middleware verifyInput is working.
  describe('verifyInput', () => {
    beforeEach(() => {
      mockRequest = {};
      mockResponse = {};
      nextFunction = jest.fn();
    });

    it('empty req.body should return TypeError', () => {
      mockRequest.body = {};
      nextFunction = (err) => err;
      const result = testsController.verifyInput(
        mockRequest,
        mockResponse,
        nextFunction
      );
      expect(result.message.err).toBeInstanceOf(TypeError);
    });

    it('missing properties in req.body should return error', () => {
      mockRequest.body = {
        header: {
          input: '/',
          method: 'GET'
        }
        // missing assertions array
      };
      nextFunction = (err) => err;
      const result = testsController.verifyInput(
        mockRequest,
        mockResponse,
        nextFunction
      );
      expect(result.message.err).toBeInstanceOf(Error);
    });

    it('invalid request method in req.body should return error', () => {
      mockRequest.body = {
        header: {
          input: '/',
          method: 'fakemethod'
        },
        assertions: []
      };
      nextFunction = (err) => err;
      const result = testsController.verifyInput(
        mockRequest,
        mockResponse,
        nextFunction
      );
      console.log(typeof result.message.err);
      expect(result.message.err).toBeInstanceOf(Error);
      expect(result).not.toEqual(nextFunction());
    });

    it('correct properties in req.body should return next()', () => {
      mockRequest.body = {
        header: {
          input: '/',
          method: 'GET'
        },
        assertions: []
      };
      const result = testsController.verifyInput(
        mockRequest,
        mockResponse,
        nextFunction
      );
      expect(result).toEqual(nextFunction());
    });
  });

  // check if the middleware helper function generateHeader is working.
  describe('generateHeader', () => {
    const header = {
      endpoint: '/',
      method: 'GET'
    };
    const assertions = [];
    const expectedResult = [
      `describe('/', () => {`,
      ` describe('GET', () => {`,
      `  it('makes a GET request to "/"', () => request(server)`,
      `   .get('/')`
    ];

    it('empty assertions array should return default header', () => {
      const result = helperFunctions.headerGenerator(header, assertions);
      expect(result).toEqual(expectedResult);
    });

    it('assertions array with status assertion should return header with status description', () => {
      assertions.push({ status: 200 });
      expectedResult[2] = `  it('responds with status 200', () => request(server)`;
      const result = helperFunctions.headerGenerator(header, assertions);
      expect(result).toEqual(expectedResult);
    });

    it('assertions array with status and content assertion should return header with full description', () => {
      assertions.push({ content: '/text/html/' });
      expectedResult[2] = `  it('responds with status 200 and content-type /text\/html/', () => request(server)`;
      const result = helperFunctions.headerGenerator(header, assertions);
      expect(result).toEqual(expectedResult);
    });
  });

  //How to test middlewares properly? Middlewares return the next function, not an object/array/data structure we can examine

  // check if the middleware createMiddleText is working.
  /* Steping back a sec, let's think about what exactly we want this test to do:
  It needs to check that the result will be equal to an array.
  -> so I can create an array with the results that I want, and when run on that specific array we can see if it is the exact same or not.
  */
  describe('generateMiddle', () => {
    //We want to test that the response being sent from this middleware is in the same positioning as the array we are feeding into it?
    let assertions;
    let expectedResult = [
      '    .expect(200)',
      `    .expect('Content-Type', /text/html/)`,
      `    .expect( { a: 'b' })`
    ];
    beforeEach(() => {
      assertions = [];
    });
    it('should return proper expect for a status of 200', () => {
      assertions.push({ status: 200 });
      const result = helperFunctions.middleGenerator(assertions);
      expect(result).toEqual([expectedResult[0]]);
    });
    it('should return proper expect for a content of text/html', () => {
      assertions.push({ content: '/text/html/' });
      const result = helperFunctions.middleGenerator(assertions);
      expect(result).toEqual([expectedResult[1]]);
    });
    // Test for body
    it('should return proper expect for a body', () => {
      assertions.push({ res_body: " { a: 'b' }" });
      const result = helperFunctions.middleGenerator(assertions);
      expect(result).toEqual([expectedResult[2]]);
    });
    (" { a: 'b' }");
    it('assertion of status: 200, content type text/html, and body should return the relevant array', () => {
      assertions.push(
        { status: 200 },
        { content: '/text/html/' },
        { res_body: " { a: 'b' }" }
      );
      const result = helperFunctions.middleGenerator(assertions);
      // console.log({ result }, { expectedResult });
      expect(result).toEqual(expectedResult);
    });
  });

  // check if the middleware helper function compiledCodeGenerator is working.
  describe('compiledCodeGenerator', () => {
    const headerOutput = ['line1', 'line2'];
    const middleOutput = ['line3', 'line4'];
    const expectedResult = 'line1\nline2\nline3\nline4;\n });\n});';
    it('should compile both headerOutput and middleOutput into a final array', () => {
      const result = helperFunctions.compiledCodeGenerator(
        headerOutput,
        middleOutput
      );
      expect(result).toEqual(expectedResult);
    });
  });
});
// jest __tests__/be-middleware.js
