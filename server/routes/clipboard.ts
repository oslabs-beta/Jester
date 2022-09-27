import express, { Express, Request, Response, Router } from 'express';
const router: Router = express.Router();
import { authController } from '../controllers/authController';
import { clipboardController } from '../controllers/clipboardController';

// route for fetching clipboard for a specified project
router.get(
  '/:projectId',
  authController.isLoggedIn,
  clipboardController.getClipboard,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.clipboard);
  }
);

// route for adding a code snippet to the clipboard of a specified project
// expected body: { code_snippet: string }
router.post(
  '/:projectId',
  authController.isLoggedIn,
  clipboardController.appendClipboard,
  (req: Request, res: Response) => {
    return res.status(201).json(res.locals.clipboard);
  }
);

// route for deleting a specific code snippet
// expected body: none
router.delete(
  '/:snippetId',
  authController.isLoggedIn,
  clipboardController.deleteSnippet,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.clipboard);
  }
);

export default router;
