import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github2';
import { Express } from 'express';

type GitHubSettings = {
  clientID: string,
  clientSecret: string,
  callbackURL: string,
}

const gitHubSettings: GitHubSettings = {
  clientID: 'fa73697734733fc09ac6',
  clientSecret: '00e08080239a284e4047e1342393f88dc3ada6ae',
  callbackURL: 'http://localhost:3000/auth/github/callback'
}

// need to clean up the type declarations of user, done, profile and tokens
// https://typescript.hotexamples.com/examples/passport/-/serializeUser/typescript-serializeuser-function-examples.html
// https://stackoverflow.com/questions/65772869/how-do-i-type-hint-the-user-argument-when-calling-passport-serializeuser-in-type
passport.serializeUser(
  function(user: Express.User, done: any) {
    console.log('User', user, typeof user)
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
      return done(null, profile);
      // logic for creating a new record on the database for the user could do in here
    }
));

export default passport;