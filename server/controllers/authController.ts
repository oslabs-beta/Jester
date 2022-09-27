import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Express, Request, Response, NextFunction } from 'express';

type GitHubSettingsType = {
  clientID: string,
  clientSecret: string,
  callbackURL: string,
  scope: Array<string>,
}

type AuthType = {
  isLoggedIn: (req: Request, res: Response, next: NextFunction) => void,
}

const gitHubSettings: GitHubSettingsType = {
  clientID: 'fa73697734733fc09ac6',
  clientSecret: '00e08080239a284e4047e1342393f88dc3ada6ae',
  callbackURL: 'http://localhost:3000/auth/github/callback',
  scope: [ 'user:email' ],
}

// need to clean up the type declarations of user, done, profile and tokens
// https://typescript.hotexamples.com/examples/passport/-/serializeUser/typescript-serializeuser-function-examples.html
// https://stackoverflow.com/questions/65772869/how-do-i-type-hint-the-user-argument-when-calling-passport-serializeuser-in-type
passport.serializeUser(
  function(user: Express.User, done: any) {
    done(null, user);
});

passport.deserializeUser(
  function(user: any, done: any) {
    done(null, user);
});

passport.use(
  new GitHubStrategy(
    gitHubSettings,
    function(accessToken: any, refreshToken: any, profile: any, done: any) {
      const email: string = profile.emails[0].value
      console.log(email)
      // logic for creating a new record on the database for the user could do in here

      return done(null, profile);
      
    }
));

export const authController: AuthType = {
    // Middleware to verify that user is logged in (typically used before database calls)
    // This will check the request to ensure the presence of a token
    isLoggedIn: (req: Request, res: Response, next: NextFunction) => {
      // this controller should verify that the user is logged in
      // do we do this via a cookie?
      // console.log('REQ USER', req.user)
      if(!req.user){
        return res.status(401).json("Error: User not authorized");
      }
      console.log('authController.isLoggedIn')
      return next();
    },
  };
  

export default passport;