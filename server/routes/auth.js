// for auth routes after we implement user accounts
// import { Request, Response, NextFunction, RequestHandler } from 'express';
const express = require('express');
const router = express.Router();
const passport = require('passport');
// const authController = require('../controllers/authController');
// MLCK: somehow this line is needed but I'm not quite sure why!
require('../controllers/passport')

// route for user being unable to sign in with GitHub
router.get('/error', 
  (req, res) => {
    return res.send('Unknown Error')
  })

// route for dialog box to GitHub authization
router.get('/github',
  passport.authenticate('github',{ scope: [ 'user:email' ] })
);

router.get('/github/callback',
  passport.authenticate('github', { failureRedirect: '/auth/error' }),
  (req, res) => {
    return res.redirect('/');
  }
);

module.exports = router;