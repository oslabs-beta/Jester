import { INDENT } from '../../client/constants/index';

const helperFunctions = {};


helperFunctions.headerGenerator = (header, assertions) => {
  const headerOutput = [];
  let description = '';

  const assertText = { status: 'status', content: 'content-type' };

  for (const assertion of assertions) {
    const keys = Object.keys(assertion);
    const assert = keys[0];
    if (assertText[assert]) {
      description += description ? ' and ' : '';
      description += `${assertText[assert]} ${assertion[assert]}`;
    }
  }

  description = 'responds with ' + description;
  if (!assertions.length)
    description = `makes a ${header.method} request to "${header.endpoint}"`;

  headerOutput.push(`describe('${header.endpoint}', () => {`);
  headerOutput.push(`${INDENT}describe('${header.method}', () => {`);
  headerOutput.push(`${INDENT}${INDENT}it('${description}', async () => {`);
  headerOutput.push(`${INDENT}${INDENT}${INDENT}const response = await request(server)`);
  headerOutput.push(`${INDENT}${INDENT}${INDENT}${INDENT}.${header.method.toLowerCase()}('${header.endpoint}')`);

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

helperFunctions.middleGenerator = (assertions) => {
  const middleOutput = [];

  //iterate through the array and push a string that will need to be typed into an output array.
  for (const assertion of assertions) {
    const keys = Object.keys(assertion);
    //So if the dropdown here is status/content/body we push a different string into the output array.
    if (keys[0] === 'status') {
      //add our status description to the it(string) we want to return
      middleOutput.push(
        `${INDENT}${INDENT}${INDENT}expect(response.statusCode).toBe(${assertion.status});`
      );
    }
    if (keys[0] === 'content') {
      middleOutput.push(
        `${INDENT}${INDENT}${INDENT}expect(response.type).toBe('${assertion.content}');`
      );
    }
    if (keys[0] === 'res_body') {
      // console.log(assertion.res_body, typeof assertion.res_body);
      middleOutput.push(
        `${INDENT}${INDENT}${INDENT}expect(response.body).toEqual(${assertion.res_body});`
      );
    }
  }
  return middleOutput;
};

helperFunctions.compiledCodeGenerator = (headerOutput, middleOutput) => {
  const compiledCode = headerOutput.concat(middleOutput);
  compiledCode.push(`${INDENT}${INDENT}` + '});', `${INDENT}` + '});', '});');
  return compiledCode.join('\n');
  // return compiledCode;
};

module.exports = helperFunctions;
