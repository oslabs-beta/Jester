import express, { Express, Request, Response, NextFunction, Router } from 'express';
const router: Router = express.Router();
import passport, { authController } from '../controllers/authController'


// route checking if user is authorized
router.get('/', 
  authController.isLoggedIn, 
  (req: Request, res: Response) => {
  res.status(200).json({ userId: req.user });
});

// route for user being unable to sign in with GitHub
router.get('/error', 
(req: Request, res: Response): Response => {
    return res.send('Unknown Error')
  })

// route for dialog box to GitHub authorization
router.get('/github',
  passport.authenticate('github',{ scope: [ 'user:email' ] })
);

// route that gets called once the user is authenticated by GitHub
router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/error' }),
  (req: Request, res: Response): void => {
    return res.redirect('../../');
  }
);

export default router;
