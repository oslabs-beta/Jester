const helperFunctions = {};

helperFunctions.headerGenerator = (header, assertions) => {
  const headerOutput = [];
  let description = '';

  for (let assertion of assertions) {
    const keys = Object.keys(assertion);
    if (keys[0] === 'status') {
      description += description ? ' and ' : '';
      description += `status ${assertion.status}`;
    }
    if (keys[0] === 'content') {
      description += description ? ' and ' : '';
      description += `content-type ${assertion.content}`;
    }
  }

  description = `responds with ` + description;
  if (!assertions.length)
    description = `makes a ${header.method} request to "${header.endpoint}"`;

  headerOutput.push(`describe('${header.endpoint}', () => {`);
  headerOutput.push(` describe('${header.method}', () => {`);
  headerOutput.push(`  it('${description}', () => request(server)`);
  headerOutput.push(`   .${header.method.toLowerCase()}('${header.endpoint}')`);

  if (
    (header.method === 'POST' ||
      header.method === 'PATCH' ||
      header.method === 'DELETE') &&
    header.req_body
  ) {
    headerOutput.push(`    .send(${header.req_body})`);
  }

  return headerOutput;
};

helperFunctions.middleGenerator = (assertions) => {
  let middleOutput = [];

  //iterate through the array and push a string that will need to be typed into an output array.
  for (let assertion of assertions) {
    const keys = Object.keys(assertion);
    //So if the dropdown here is status/content/body we push a different string into the output array.
    if (keys[0] === 'status') {
      //add our status description to the it(string) we want to return
      middleOutput.push(`    .expect(${assertion.status})`);
    }
    if (keys[0] === 'content') {
      middleOutput.push(`    .expect('Content-Type', ${assertion.content})`);
    }
    if (keys[0] === 'res_body') {
      middleOutput.push(`    .expect(${assertion.res_body})`);
    }
  }
  return middleOutput;
};

helperFunctions.compiledCodeGenerator = (headerOutput, middleOutput) => {
  const compiledCode = headerOutput.concat(middleOutput);
  compiledCode[compiledCode.length - 1] += ';';
  compiledCode.push(` });`, `});`);
  return compiledCode;
};

module.exports = helperFunctions;
