// Authorization routes
import express, { Request, Response, NextFunction, Router } from 'express';
import passport, { authController } from '../controllers/authController';

const router: Router = express.Router();

/* 
  This route will check if user is authorized and return their user_id if so
 */
router.get(
  '/',
  authController.isLoggedIn,
  authController.getUserId,
  (req, res) => {
    return res.status(200).json(res.locals.userId);
  }
);

/* 
  This route will handle user being unable to sign in with GitHub
 */
router.get('/error', (req: Request, res: Response): Response => {
  return res.send('Unknown Error');
});

/* 
  This route will handle the dialog box to GitHub authorization (i.e. login with Github)
 */
router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

/* 
  This route will be called called once the user is authenticated by GitHub.
  Once authenticated, it will save relevant user information to cookies
 */
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/error' }),
  authController.getUserId,
  (req: any, res: Response): void => {
    res.cookie('code', req.query.code);
    res.cookie('email', req.user?.emails[0].value);
    res.cookie('username', req.user?.username);
    res.cookie('isLoggedIn', true);
    return res.redirect('../../authenticate');
  }
);

/* 
  This route will handle user logout
 */
router.post('/logout', (req: any, res: Response, next: NextFunction): void => {
  req.logout();
  return res.redirect('../../');
});

export default router;
