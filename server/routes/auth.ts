import express, { Express, Request, Response, NextFunction, Router } from 'express';
const router: Router = express.Router();
import passport from 'passport';
// const authController = require('../controllers/authController');
// MLCK: somehow this line is needed but I'm not quite sure why!
require('../controllers/passport')

// route for user being unable to sign in with GitHub
router.get('/error', 
(req: Request, res: Response): Response => {
    return res.send('Unknown Error')
  })

// route for dialog box to GitHub authization
router.get('/github',
  passport.authenticate('github',{ scope: [ 'user:email' ] })
);

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth/error' }),
  (req: Request, res: Response): void => {
    return res.redirect('/');
  }
);

export default router;