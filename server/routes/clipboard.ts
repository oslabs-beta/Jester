// Clipboard routes
import express, { Request, Response, Router } from 'express';

import { authController } from '../controllers/authController';
import { clipboardController } from '../controllers/clipboardController';

const router: Router = express.Router();
/* 
  This route will return the clipoard (saved test snippets)
  for a specified project_id
 */
router.get(
  '/:project_id',
  authController.isLoggedIn,
  authController.getUserId,
  clipboardController.getClipboard,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.clipboard);
  }
);

/* 
  This route will add a code snippet to the clipoard of a specified project
 */
router.post(
  '/:project_id',
  authController.isLoggedIn,
  authController.getUserId,
  clipboardController.appendClipboard,
  (req: Request, res: Response) => {
    return res.status(201).json(res.locals.clipboard);
  }
);

/* 
  This route will delete a code snippet based on snippet_id
 */
router.delete(
  '/:snippet_id',
  authController.isLoggedIn,
  authController.getUserId,
  clipboardController.deleteSnippet,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.clipboard);
  }
);

export default router;
