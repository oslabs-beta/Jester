import express, { Request, Response, NextFunction, Router } from 'express';
import passport, { authController } from '../controllers/authController';

const router: Router = express.Router();

// route checking if user is authorized
router.get(
  '/',
  authController.isLoggedIn,
  authController.getUserId,
  (req, res) => {
    return res.status(200).json(res.locals.userId);
  }
);

// route for user being unable to sign in with GitHub
router.get('/error', (req: Request, res: Response): Response => {
  return res.send('Unknown Error');
});

// route for dialog box to GitHub authorization (i.e. login with Github)
router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

// route that gets called once the user is authenticated by GitHub
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/error' }),
  // Can add middleware to query DB for user id here!
  // Can add middleware to store auth code+username in sessions table that expires
  (req: any, res: Response): void => {
    // /github/callback/?code=4234324324 <= user authorization code
    res.cookie('code', req.query.code);
    res.cookie('email', req.user?.emails[0].value);
    res.cookie('username', req.user?.username);
    res.cookie('isLoggedIn', true);
    // res.cookie('userId', res.locals.userId) // return userID here
    return res.redirect('../../authenticate');
  }
);

router.post('/logout', (req: any, res: Response, next: NextFunction): void => {
  req.logout();
  return res.redirect('../../');
});

export default router;
