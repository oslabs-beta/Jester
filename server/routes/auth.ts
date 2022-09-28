import express, { Express, Request, Response, NextFunction, Router } from 'express';
const router: Router = express.Router();
import passport, { authController } from '../controllers/authController'


// route for user being unable to sign in with GitHub
router.get('/error', 
(req: Request, res: Response): Response => {
    return res.send('Unknown Error')
  })

// route for dialog box to GitHub authorization (i.e. login with Github)
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

router.post('/logout', (req: Request, res: Response, next: NextFunction): void => {
  req.logout(err => {
    if (err) { return next(err); }
    return res.redirect('../../');
  });
});

export default router;
