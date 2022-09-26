// routes for front-end to get generated test code on submit
const express = require('express');
const router = express.Router();
const testsController = require('../controllers/testsController');

router.post(
  '/',
  testsController.verifyInput,
  testsController.createHeaderText,
  testsController.createMiddleText,
  testsController.compileTestCode,
  (req, res) => {
    return res.status(200).json(res.locals.compiledTestCode);
  }
);

export default router;
