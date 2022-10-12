import testsController from '../server/controllers/testsController.js';
import helperFunctions from '../server/helpers/functions.js';
import { INDENT } from '../client/constants/index';

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
          method: 'GET',
        },
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
          method: 'fakemethod',
        },
        assertions: [],
      };
      nextFunction = (err) => err;
      const result = testsController.verifyInput(
        mockRequest,
        mockResponse,
        nextFunction
      );
      expect(result.message.err).toBeInstanceOf(Error);
      expect(result).not.toEqual(nextFunction());
    });

    it('correct properties in req.body should return next()', () => {
      mockRequest.body = {
        header: {
          input: '/',
          method: 'GET',
        },
        assertions: [],
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
      method: 'GET',
    };
    const assertions = [];
    const expectedResult = [
      'describe(\'/\', () => {',
      `${INDENT}describe('GET', () => {`,
      `${INDENT}${INDENT}it('makes a GET request to "/"', async () => {`,
      `${INDENT}${INDENT}${INDENT}const response = await request(server)`,
      `${INDENT}${INDENT}${INDENT}${INDENT}.get('/');`,
    ];

    it('empty assertions array should return default header', () => {
      const result = helperFunctions.headerGenerator(header, assertions);
      expect(result).toEqual(expectedResult);
    });

    it('assertions array with status assertion should return header with status description', () => {
      assertions.push({ status: 200 });
      expectedResult[2] = `${INDENT}${INDENT}it('responds with status 200', async () => {`;
      const result = helperFunctions.headerGenerator(header, assertions);
      expect(result).toEqual(expectedResult);
    });

    it('assertions array with status and content assertion should return header with full description', () => {
      assertions.push({ content: '/text/html/' });
      expectedResult[2] =
        `${INDENT}${INDENT}it('responds with status 200 and content-type /text/html/', async () => {`;
      const result = helperFunctions.headerGenerator(header, assertions);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('generateAssertions', () => {
    let assertions;
    const expectedResult = [
      `${INDENT}${INDENT}${INDENT}expect(response.statusCode).toBe(200);`,
      `${INDENT}${INDENT}${INDENT}expect(response.type).toBe('/text/html/');`,
      `${INDENT}${INDENT}${INDENT}expect(response.body).toEqual( { a: 'b' });`,
    ];

    beforeEach(() => {
      assertions = [];
    });

    it('should return proper expect for a status of 200', () => {
      assertions.push({ status: 200 });
      const result = helperFunctions.assertionsGenerator(assertions);
      expect(result).toEqual([expectedResult[0]]);
    });

    it('should return proper expect for a content of text/html', () => {
      assertions.push({ content: '/text/html/' });
      const result = helperFunctions.assertionsGenerator(assertions);
      expect(result).toEqual([expectedResult[1]]);
    });

    it('should return proper expect for a body', () => {
      assertions.push({ res_body: ' { a: \'b\' }' });
      const result = helperFunctions.assertionsGenerator(assertions);
      expect(result).toEqual([expectedResult[2]]);
    });
    (' { a: \'b\' }');

    it('assertion of status: 200, content type text/html, and body should return the relevant array', () => {
      assertions.push(
        { status: 200 },
        { content: '/text/html/' },
        { res_body: ' { a: \'b\' }' }
      );
      const result = helperFunctions.assertionsGenerator(assertions);
      expect(result).toEqual(expectedResult);
    });
  });

  // check if the middleware helper function compiledCodeGenerator is working.
  describe('compiledCodeGenerator', () => {
    const headerOutput = ['line1', 'line2'];

    const assertionsOutput = ['line3', 'line4'];
    const expectedResult = `line1\nline2\nline3\nline4\n${INDENT}${INDENT}});\n${INDENT}});\n});`;


    it('should compile both headerOutput and AssertionsOutput into a final array', () => {
      const result = helperFunctions.compiledCodeGenerator(
        headerOutput,
        assertionsOutput
      );
      expect(result).toEqual(expectedResult);
    });
  });
});
