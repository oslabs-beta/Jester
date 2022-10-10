/* 
  This file contains helper functions to help with the generation
  of test code that will be returned to the client making the request.
 */
/* 
  This function generates the header portion of the test code
 */

import { INDENT } from '../../client/constants/index';

const helperFunctions = {};


helperFunctions.headerGenerator = (header, assertions) => {
  const headerOutput = [];
  let description = '';

  const assertText = { status: 'status', content: 'content-type' };

  // Generates the test description:
  // ex: it('responds with status 200 and...
  for (const assertion of assertions) {
    const keys = Object.keys(assertion);
    const assert = keys[0];
    if (assertText[assert]) {
      description += description ? ' and ' : '';
      description += `${assertText[assert]} ${assertion[assert]}`;
    }
  }
  description = 'responds with ' + description;
  if (!assertions.length) {
    description = `makes a ${header.method} request to "${header.endpoint}"`;
  }

  // Generates the full header
  headerOutput.push(`describe('${header.endpoint}', () => {`);
  headerOutput.push(`${INDENT}describe('${header.method}', () => {`);
  headerOutput.push(`${INDENT}${INDENT}it('${description}', async () => {`);
  headerOutput.push(`${INDENT}${INDENT}${INDENT}const response = await request(server)`);
  headerOutput.push(`${INDENT}${INDENT}${INDENT}${INDENT}.${header.method.toLowerCase()}('${header.endpoint}')`);

  // If header is not GET and a req.body is provided, include it in the test code
  if (
    (header.method === 'POST' ||
      header.method === 'PATCH' ||
      header.method === 'DELETE') &&
    header.req_body
  ) {
    headerOutput.push(`${INDENT}${INDENT}${INDENT}${INDENT}.send(${header.req_body})`);
  }

  headerOutput[headerOutput.length - 1] += ';';
  return headerOutput;
};

/* 
  This function generates the assertions portion of the test code
 */
helperFunctions.assertionsGenerator = (assertions) => {
  const assertionsOutput = [];

  // Iterate through the input assertions array and generate
  // the relevant line of code for each assertion
  for (const assertion of assertions) {
    const keys = Object.keys(assertion);
    if (keys[0] === 'status') {
      //add our status description to the it(string) we want to return
      assertionsOutput.push(
        `${INDENT}${INDENT}${INDENT}expect(response.statusCode).toBe(${assertion.status});`
      );
    }
    if (keys[0] === 'content') {
      assertionsOutput.push(
        `${INDENT}${INDENT}${INDENT}expect(response.type).toBe('${assertion.content}');`
      );
    }
    if (keys[0] === 'res_body') {
      // console.log(assertion.res_body, typeof assertion.res_body);
      assertionsOutput.push(
        `${INDENT}${INDENT}${INDENT}expect(response.body).toEqual(${assertion.res_body});`
      );
    }
  }
  return assertionsOutput;
};

/* 
  This function compiles the output from both generators and
  the complete generated test code
 */

helperFunctions.compiledCodeGenerator = (headerOutput, assertionsOutput) => {
  const compiledCode = headerOutput.concat(assertionsOutput);
  compiledCode.push(`${INDENT}${INDENT}` + '});', `${INDENT}` + '});', '});');

  return compiledCode.join('\n');
};

module.exports = helperFunctions;