import express, { Express, Request, Response, Router } from 'express';
const router: Router = express.Router();
import { authController } from '../controllers/authController';
import { projectController } from '../controllers/projectController';

// route for fetching user's list of Projects based on userId
router.get(
  '/:userId',
  authController.isLoggedIn,
  authController.getUserId,
  projectController.getProjects,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.projects);
  }
);

// route for adding a new Project associated with a userId
// expected body: { project_id: int, user_id: int}
router.post(
  '/',
  authController.isLoggedIn,
  authController.getUserId,
  projectController.addProject,
  (req: Request, res: Response) => {
    return res.status(201).json(res.locals.projects);
  }
);

// route for deleting a specific project associated with a userId
// expected body: { project_id: int, user_id: int}
router.delete(
  '/:project_id',
  authController.isLoggedIn,
  authController.getUserId,
  projectController.deleteProject,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.projects);
  }
);

export default router;
