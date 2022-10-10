// Projects routes
import express, { Request, Response, Router } from 'express';
const router: Router = express.Router();
import { authController } from '../controllers/authController';
import { projectController } from '../controllers/projectController';

/* 
  This route will return a list of Projects based on userId
 */
router.get(
  '/',
  authController.isLoggedIn,
  authController.getUserId,
  projectController.getProjects,
  (req: Request, res: Response) => {
    return res.status(200).json(res.locals.projects);
  }
);

/* 
  This route will add a new Project associated with a userId
 */
router.post(
  '/',
  authController.isLoggedIn,
  authController.getUserId,
  projectController.addProject,
  (req: Request, res: Response) => {
    return res.status(201).json(res.locals.projects);
  }
);

/* 
  This route will delete a specific project associated with a userId
 */
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
