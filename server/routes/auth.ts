import express, { Express, Request, Response, NextFunction, Router } from 'express';
const router: Router = express.Router();
import passport from '../controllers/authController'


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
    // is this the right place to insert logic for SQL db for user table
    // if user doesn't exist on the database, add to user table
    return res.redirect('../../');
  }
);

export default router;
