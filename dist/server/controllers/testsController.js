"use strict";
const helperFunctions = require('../helpers/functions.js');
const testsController = {};
testsController.verifyInput = (req, res, next) => {
    try {
        const { header, assertions } = req.body;
        const methods = new Set(['GET', 'POST', 'PATCH', 'DELETE']);
        if (typeof header.endpoint !== 'string' ||
            typeof header.method !== 'string' ||
            !Array.isArray(assertions)) {
            throw new Error('Missing properties or wrong data types in request.');
        }
        header.method = header.method.toUpperCase();
        if (!methods.has(header.method)) {
            throw new Error('Invalid request method provided.');
        }
        if ((header.method === 'POST' || header.method === 'PATCH') &&
            !header.req_body) {
            throw new Error('Body not provided with POST or PATCH request.');
        }
        res.locals.header = header;
        res.locals.assertions = assertions;
        return next();
    }
    catch (err) {
        return next({
            log: 'verifyInput middleware error: ' + err,
            message: { err }
        });
    }
};
testsController.createHeaderText = (req, res, next) => {
    const header = res.locals.header;
    const assertions = res.locals.assertions;
    res.locals.headerOutput = helperFunctions.headerGenerator(header, assertions);
    return next();
};
testsController.createMiddleText = (req, res, next) => {
    const assertions = res.locals.assertions;
    const middle = res.locals.middle;
    res.locals.middleOutput = helperFunctions.middleGenerator(assertions);
    return next();
};
testsController.compileTestCode = (req, res, next) => {
    const headerOutput = res.locals.headerOutput;
    const middleOutput = res.locals.middleOutput;
    res.locals.compiledTestCode = helperFunctions.compiledCodeGenerator(headerOutput, middleOutput);
    return next();
};
module.exports = testsController;
