const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

// type GitHubSettings = {
//   clientID: String,
//   clientSecret: String,
//   callbackURL: String,
// }

// const gitHubSettings: GitHubSettings = {
const gitHubSettings = {
  clientID: 'fa73697734733fc09ac6',
  clientSecret: '00e08080239a284e4047e1342393f88dc3ada6ae',
  callbackURL: 'http://localhost:3000/auth/github/callback'
}

passport.serializeUser(function(user, done) {
  console.log('User', user, typeof user)
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(
  new GitHubStrategy(
    gitHubSettings,
    function(accessToken, refreshToken, profile, done) {
      return done(null, profile);
      // logic for creating a new record on the database for the user could do in here
    }
));