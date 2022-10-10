// Tests Routes
import express, { Request, Response, Router } from 'express';
import testsController from '../controllers/testsController';
const router: Router = express.Router();

/* 
  This route will return a generated test snippet based on
  user input provided in the request body
 */
router.post(
  '/',
  testsController.verifyInput,
  testsController.createHeaderText,
  testsController.createAssertionsText,
  testsController.compileTestCode,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.compiledTestCode);
  }
);

export default router;
