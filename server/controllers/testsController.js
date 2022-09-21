const testsController = {};

/*
  Middleware to verify that we have the properties we are looking for in our input object. If it fails, return 400 error code.
  verify the reqest body has all the relevant properties and save them to res.locals.header and res.locals.assertions

  EXPECTED INPUT:
    {
      header: {
                endpoint : '/',
                method: 'GET'
      },
      assertions: [
                    { content: '/text\/html/' },
                    { status: 200 },
                    ...
      ]
    }
    EXPECTED OUTPUT: res.locals.header, res.locals.assertions
*/
testsController.verifyInput = (req, res, next) => {
  try {
    const { header, assertions } = req.body;
    if (
      typeof header.endpoint !== 'string' ||
      typeof header.method !== 'string' ||
      !Array.isArray(assertions)
    ) {
      throw new Error('missing properties or wrong data types in req.body');
    }
    res.locals.header = header;
    res.locals.assertions = assertions;
    return next();
  } catch (err) {
    return next({
      log: 'verifyInput middleware error: ' + err,
      message: { err },
    });
  }
};

/* Converts header part of input object into header of test code

  EXPECTED INPUT: res.locals.header, res.locals.assertions
  EXPECTED OUTPUT: res.locals.headerOutput = Array of Strings
    [
      `describe('/', () => {`,
        `describe('GET', () => {`,
          `it('responds with status 200 and content type text/html', () => request(server)`,
            `.get('/')`
      ]
*/
testsController.headerGenerator = (header, assertions) => {
  const headerOutput = [];

  let description = '';

  for (let assertion of assertions) {
    if (Object.keys(assertion)[0] === 'status') {
      description += description ? ' and ' : '';
      description += `status ${assertion.status}`;
    }
    if (Object.keys(assertion)[0] === 'content') {
      description += description ? ' and ' : '';
      description += `content-type ${assertion.content}`;
    }
  }

  description = `responds with ` + description;
  if (!assertions.length)
    description = `makes a ${header.method} request to "${header.endpoint}"`;

  headerOutput.push(`describe('${header.endpoint}', () => {`);
  headerOutput.push(`describe('${header.method}', () => {`);
  headerOutput.push(`it('${description}', () => request(server)`);
  headerOutput.push(`.get('${header.endpoint}')`);

  return headerOutput;
};

testsController.createHeaderText = (req, res, next) => {
  const header = res.locals.header;
  const assertions = res.locals.assertions;

  res.locals.headerOutput = testsController.headerGenerator(header, assertions);

  return next();
};

//Maybe need to write a middleware to reorganize the res array?
/* 
  INPUT: assertions: [
                    { status: 200 },
                    { content: 'text/html' }
      ]
*/
//Write a MiddleWare to examine the res object from the front-end and produce lines of code depending on what is coming in from the middleware.
testsController.middleGenerator = (assertions) => {
  let middleOutput = [];
  //the it statement: will need some logic there when generating the string to be returned.
  //iterate through the array and push a string that will need to be typed into an output array.
  //the get should be simple enough. For this type of testing I think it will just be to the same route as the header route will be.
  for (let assertion of assertions) {
    //So if the dropdown here is status/content/body we push a different string into the output array.
    //how to access this dropdown item? res.locals.data.
    // console.log(assertion);
    if (Object.keys(assertion)[0] === 'status') {
      //add our status description to the it(string) we want to return
      middleOutput.push(`.expect(${assertion.status})`);
    }
    if (Object.keys(assertion)[0] === 'content') {
      middleOutput.push(`.expect('Content-Type', ${assertion.content})`);
    }
  }
  return middleOutput;
};

testsController.createMiddleText = (req, res, next) => {
  const assertions = res.locals.assertions;
  const middle = res.locals.middle;

  res.locals.middleOutput = testsController.middleGenerator(assertions);
  return next();
};

//     if (res.locals.data.middleDropdown[i] === 'Body') {
//       stringToReturn.concat(` ${res.locals.data.body[i]}`);
//       output.push(`.expect('body', ${res.locals.data.body[i]});`);
//     }
//   }
// };

//the expects are going to be a bit more difficult. for each expect, we need to create a line of code that returns an expect for the assertion and/or text input where applicable. /};

// This middleware will take the output from the previous two middleware functions in res.locals
// and compile them into a final test code to return to the front-end

testsController.compiledCodeGenerator = (headerOutput, middleOutput) => {
  const compiledCode = headerOutput.concat(middleOutput);
  compiledCode[compiledCode.length - 1] += ';';
  compiledCode.push(`});`, `});`);
  return compiledCode;
};

testsController.compileTestCode = (req, res, next) => {
  const headerOutput = res.locals.headerOutput;
  const middleOutput = res.locals.middleOutput;

  res.locals.compiledTestCode = testsController.compiledCodeGenerator(
    headerOutput,
    middleOutput
  );
  return next();
};

module.exports = testsController;
