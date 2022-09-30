import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Express, Request, Response, NextFunction } from 'express';
import db from '../models/userModel';

type GitHubSettingsType = {
  clientID: string;
  clientSecret: string;
  callbackURL: string;
  scope: Array<string>;
};

type AuthType = {
  isLoggedIn: (req: Request, res: Response, next: NextFunction) => void;
  getUserId: (req: Request, res: Response, next: NextFunction) => void;
};

const gitHubSettings: GitHubSettingsType = {
  clientID: 'fa73697734733fc09ac6',
  clientSecret: '00e08080239a284e4047e1342393f88dc3ada6ae',
  callbackURL: 'http://localhost:3000/auth/github/callback',
  scope: ['user:email']
};

// need to clean up the type declarations of user, done, profile and tokens
// https://typescript.hotexamples.com/examples/passport/-/serializeUser/typescript-serializeuser-function-examples.html
// https://stackoverflow.com/questions/65772869/how-do-i-type-hint-the-user-argument-when-calling-passport-serializeuser-in-type
passport.serializeUser(function (user: Express.User, done: any) {
  done(null, user);
});

passport.deserializeUser(function (user: any, done: any) {
  done(null, user);
});

passport.use(
  new GitHubStrategy(gitHubSettings, function (
    accessToken: any,
    refreshToken: any,
    profile: any,
    done: any
  ) {
    const email: string = profile.emails[0].value;
    const params = [email];
    // console.log(email);
    // logic for creating a new record on the database for the user could go in here

    return done(null, profile);
  })
);

export const authController: AuthType = {
  // Middleware to verify that user is logged in (typically used before database calls)
  isLoggedIn: (req: Request, res: Response, next: NextFunction) => {
    // this controller should verify that the user is logged in
    // do we do this via a cookie?
    // console.log('REQ USER', req.user)
    // if(!req.user){
    //   return res.status(401).json("Error: User not authorized");
    // }
    // MLCK: Is this a security vulnerability?  Another option is to store session in database and make a db call
    if (!req.user || !req.isAuthenticated()) {
      return res.status(401).json('Error: User not authorized');
    }
    // console.log('authController.isLoggedIn');
    return next();
  },

    getUserId: async (req: any, res: Response, next: NextFunction) => {
      // this controller queries the user table to insert a new user
      // using the email provided on the request object. If the user
      // already exists, it performs a mock-update so that regardless
      // of whether the user already existed or not, it returns the user ID.
      const { email } = req.user?.emails[0].value;
      const newUserQuery = `
      INSERT INTO user_table(usermail)
      VALUES($1)
      ON CONFLICT DO NOTHING
      (usermail) DO UPDATE
      SET usermail=($1)
      RETURNING user_id
      `
      const params = [email];
      const result = await db.query(newUserQuery, params);
      res.locals.userId = result;
      return next();
    }
};

export default passport;
