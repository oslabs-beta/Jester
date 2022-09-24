"use strict";
const helperFunctions = {};
helperFunctions.headerGenerator = (header, assertions) => {
    const headerOutput = [];
    let description = '';
    const assertText = { status: 'status', content: 'content-type' };
    for (let assertion of assertions) {
        const keys = Object.keys(assertion);
        const assert = keys[0];
        if (assertText[assert]) {
            description += description ? ' and ' : '';
            description += `${assertText[assert]} ${assertion[assert]}`;
        }
    }
    description = `responds with ` + description;
    if (!assertions.length)
        description = `makes a ${header.method} request to "${header.endpoint}"`;
    headerOutput.push(`describe('${header.endpoint}', () => {`);
    headerOutput.push(` describe('${header.method}', () => {`);
    headerOutput.push(`  it('${description}', () => request(server)`);
    headerOutput.push(`   .${header.method.toLowerCase()}('${header.endpoint}')`);
    if ((header.method === 'POST' ||
        header.method === 'PATCH' ||
        header.method === 'DELETE') &&
        header.req_body) {
        headerOutput.push(`    .send(${header.req_body})`);
    }
    return headerOutput;
};
helperFunctions.middleGenerator = (assertions) => {
    let middleOutput = [];
    for (let assertion of assertions) {
        const keys = Object.keys(assertion);
        if (keys[0] === 'status') {
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
