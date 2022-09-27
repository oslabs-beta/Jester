// routes for front-end to get generated test code on submit
import express, { Express, Request, Response, Router } from 'express';
const router: Router = express.Router();
const testsController = require('../controllers/testsController');

router.post(
  '/',
  testsController.verifyInput,
  testsController.createHeaderText,
  testsController.createMiddleText,
  testsController.compileTestCode,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.compiledTestCode);
  }
);

export default router;
