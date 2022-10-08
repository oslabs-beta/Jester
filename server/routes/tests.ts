// routes for front-end to get generated test code on submit
import express, { Request, Response, Router } from 'express';
import testsController from '../controllers/testsController';
const router: Router = express.Router();

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
