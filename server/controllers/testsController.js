import helperFunctions from '../helpers/functions.js';

const testsController = {};

/*
  EXAMPLE REQUEST BODY FORMAT:
    {
      header: {
                endpoint : '/',
                method: 'POST'
                req_body: {a:1} // Needed for POST and PATCH, optional for DELETE
      },
      assertions: [
                    { content: '/text\/html/' },
                    { status: 200 },
                    { res_body: { a: 'b' } }
                    ...
      ]
    }
*/

/* Middleware to verify that we have the properties we are looking for in our input object. 
  If it fails, return 400 error code.
  Verify the reqest body has all the relevant properties and save them to res.locals.header and res.locals.assertions 
*/
testsController.verifyInput = (req, res, next) => {
  try {
    const { header, assertions } = req.body;
    const methods = new Set(['GET', 'POST', 'PATCH', 'DELETE']);

    // Check for improper input
    if (
      typeof header.endpoint !== 'string' ||
      typeof header.method !== 'string' ||
      !Array.isArray(assertions)
    ) {
      throw new Error('Missing properties or wrong data types in request.');
    }

    // Check for supported request methods
    header.method = header.method.toUpperCase();
    if (!methods.has(header.method)) {
      throw new Error('Invalid request method provided.');
    }

    // POST and PATCH methods must have request body provided
    if (
      (header.method === 'POST' || header.method === 'PATCH') &&
      !header.req_body
    ) {
      throw new Error('Body not provided with POST or PATCH request.');
    }

    res.locals.header = header;
    res.locals.assertions = assertions;
    return next();
  } catch (err) {
    return next({
      log: 'verifyInput middleware error: ' + err,
      message: { err }
    });
  }
};

/* 
  Converts header part of input object into header of test code
  EXPECTED INPUT: res.locals.header, res.locals.assertions
  EXPECTED OUTPUT: res.locals.headerOutput
  EXAMPLE OUTPUT: [
      `describe('/', () => {`,
        `describe('GET', () => {`,
          `it('responds with status 200 and content type text/html', () => request(server)`,
            `.get('/')`
      ]
*/
testsController.createHeaderText = (req, res, next) => {
  const header = res.locals.header;
  const assertions = res.locals.assertions;

  res.locals.headerOutput = helperFunctions.headerGenerator(header, assertions);

  return next();
};

// Converts assertions part of input object into assertions part of test code
testsController.createAssertionsText = (req, res, next) => {
  const assertions = res.locals.assertions;

  res.locals.assertionsOutput = helperFunctions.assertionsGenerator(assertions);
  return next();
};

/* This middleware will take the output from the previous two middleware functions in res.locals and compile them into a final test code to return to the front-end */
testsController.compileTestCode = (req, res, next) => {
  const headerOutput = res.locals.headerOutput;
  const assertionsOutput = res.locals.assertionsOutput;

  res.locals.compiledTestCode = helperFunctions.compiledCodeGenerator(
    headerOutput,
    assertionsOutput
  );
  return next();
};

export default testsController;
