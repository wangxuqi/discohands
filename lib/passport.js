var passport       = require('passport');
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

var callbackURL =
  (process.env.ROOT_URL || 'http://localhost:8080') + '/auth/google/callback';

var authorizedDomain = process.env.AUTHORIZED_DOMAIN || 'gmail.com';

passport.use(new GoogleStrategy({
  clientID:     process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL:  callbackURL
}, function(token, refreshToken, profile, done) {
  var user = {
    display_name: profile.displayName,
    email: profile.emails[0].value
  };

  var email_domain = user.email.split('@')[1].toLowerCase();
  if (email_domain !== authorizedDomain) {
    return done();
  }

  done(null, user);
}));

passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(user, done) {
  done(null, user);
});

module.exports = passport;
