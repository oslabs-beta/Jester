import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { Profile, Strategy as GitHubStrategy } from 'passport-github2';

import db from '../models/userModel';

type GitHubSettingsType = {
  clientID: string ;
  clientSecret: string ;
  callbackURL: string;
  scope: Array<string>;
};

type AuthType = {
  isLoggedIn: (req: Request, res: Response, next: NextFunction) => void;
  getUserId: (req: Request, res: Response, next: NextFunction) => void;
};

type DoneType = (err: Error | null, user: Express.User) => void

const gitHubSettings: GitHubSettingsType = {
  clientID: process.env.clientIDHeroku || '',
  clientSecret: process.env.clientSecretHeroku || '',
  callbackURL: 'https://jester.software/auth/github/callback',
  scope: ['user:email']
};

passport.serializeUser(function (user: Express.User, done: DoneType) {
  done(null, user);
});

passport.deserializeUser(function (user: Express.User, done: DoneType) {
  done(null, user);
});

passport.use(
  new GitHubStrategy(gitHubSettings, function (
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: DoneType,
  ) {
    return done(null, profile);
    
  })
);

export const authController: AuthType = {
  // Middleware to verify that user is logged in (typically used before database calls)
  isLoggedIn: (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !req.isAuthenticated()) {
      return res.status(401).json('Error: User not authorized');
    }
    return next();
  },

  /*
    This controller queries the user table to insert a new user
    using the email provided on the request object. If the user
    already exists, it performs a mock-update so that regardless
    of whether the user already existed or not, it returns the user ID.
  */
  getUserId: async (req: any, res: Response, next: NextFunction) => {
    const email = req.user.emails[0].value;
    if (!email) return next({
      log: 'email not fond on request body',
      status: 400,
      message: 'an error occurred in attempting to get the user ID'
    });
    const newUserQuery = `
      INSERT INTO user_table(usermail)
      VALUES($1)
      ON CONFLICT (usermail) DO UPDATE
      SET usermail=($1)
      RETURNING user_id
      `;
    const params = [email];
    try {
      const result = await db.query(newUserQuery, params);
      res.locals.user_id = result.rows[0].user_id;
      return next();
    }
    catch(err) {
      return next({
        log: `error in getUserId: ${err}`,
        status: 500,
        message: 'error occurred in getUserId middleware function'
      });
    }
  }
};

export default passport;
