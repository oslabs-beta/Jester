
import express, { Express, Request, Response, NextFunction, Router } from 'express';
const router: Router = express.Router();
import { authController } from '../controllers/authController'
import { clipboardController } from '../controllers/clipboardController'

// route for fetching clipboard (array of code snippets) for a user 
router.get(
  '/:id',
  authController.isLoggedIn,
  clipboardController.get,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.clipboard);
  }
);

// route for adding a code snippet for a user to the Clipboard Table
router.post(
  '/:id',
  authController.isLoggedIn,
  clipboardController.append,
  (req: Request, res: Response) => {
    return res.status(201).json(res.locals.clipboard);
  }
);

// route for deleting all code snippets for a user to th Clipboard Table
router.delete(
  '/:id',
  authController.isLoggedIn,
  clipboardController.delete,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.clipboard);
  }
);


export default router;