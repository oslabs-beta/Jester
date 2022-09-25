import passport from 'passport';
import { Strategy } from 'passport-github2';

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
passport.serializeUser(
  function(user: any, done: any) {
    console.log('User', user, typeof user)
    done(null, user);
});

passport.deserializeUser(
  function(user: any, done: any) {
    done(null, user);
});

passport.use(
  new Strategy(
    gitHubSettings,
    function(accessToken: any, refreshToken: any, profile: any, done: any) {
      return done(null, profile);
      // logic for creating a new record on the database for the user could do in here
    }
));