// import * as cas from "passport-cas";
// import * as cas_apereo from "passport-apereo-cas";
// import * as cas_sso from "passport-sso-cas";
// import * as cas_harvard from "@harvard-library/passport-cas2-strategy";
import * as passport from "passport";


const CAS_BASE_URL = "https://secure.dst.usb.ve";
const CAS_LOGIN_URL = "https://secure.dst.usb.ve/login";
const CAS_VALIDATE_URL = "/proxyValidate";
const CAS_SERVICE_BASE_URL = "http://localhost:3000/sinai";
const CAS_SERVICE_URL = "/login";


const verify = function (user, done) {

  // Check if all required user object properites were returned by the CAS server
  if (!user) {
    done("Missing required user properties from the authentication server.");
    return null;
  };

  // Check if user exists in database here...

  console.log(`Authentication completed successfully ${user}`);

  // Return user object properties
  done(null, user);

  return null;
};

const authenticate = function (req, res, casv) {

  passport.authenticate(casv, function (err, user, info) {

    // Authentication strategy callback
    console.log(`passport.authenticate ${user} ${info}`);

    // Check error
    if (err) {
      console.error(err);
      return res.status(500).json(err);
    }

    /* AUTHENTICATION FAILED */
    // Check if user empty
    if (!user) {
      const message = info ? info : "Authentication failed";
      console.log(message)
      // Render server side unauthorized page with error message
      return res.status(401).render('unauthorized', {
        error: true,
        errorMsg: message
      });
    }

    /* AUTHENTICATION SUCCESS */

    // Create session or generate JWT token here...

    return res.redirect('/sinai');
  });
};


export const passport_cas = function (req, res) {

  const options = {
    version: "CAS3.0",
    ssoBaseURL: CAS_BASE_URL,
    serverBaseURL: CAS_SERVICE_BASE_URL,
    serverURL: CAS_SERVICE_URL,
    validateURL: CAS_VALIDATE_URL
  };

  const strategy = new cas.Strategy(options, verify);

  passport.use(strategy);
  authenticate(req, res, "cas");
};

export const passport_apereo_cas = function (req, res) {

  const options = {
    version: "CAS3.0",
    casBaseURL: CAS_BASE_URL,
    serviceBaseURL: CAS_SERVICE_BASE_URL,
    serviceURL: CAS_SERVICE_URL,
    validateURL: CAS_VALIDATE_URL
  };

  const strategy = new cas_apereo.Strategy(options, verify);

  passport.use(strategy);
  authenticate(req, res, "cas");
};

export const passport_sso_cas = function (req, res) {

  const options = {
    version: "CAS3.0",
    casBaseURL: CAS_BASE_URL,
    serviceBaseURL: CAS_SERVICE_BASE_URL,
    serviceURL: CAS_SERVICE_URL,
    validateURL: CAS_VALIDATE_URL
  };

  const strategy = new cas_sso.Strategy(options, verify);

  passport.use(strategy);
  authenticate(req, res, "cas");
};

export const passport_harvard_cas = function (req, res) {

  const options = {
    ssoBaseURL: CAS_BASE_URL,
    ssoLoginURL: CAS_LOGIN_URL,
    appServiceBaseURL: CAS_SERVICE_BASE_URL,
    validateEndpoint: CAS_VALIDATE_URL
  };

  const strategy = new cas_harvard.Strategy(options, verify);

  passport.use(strategy);
  authenticate(req, res, "cas2");
};


/*
  https://www.google.com/url?q=https%3A%2F%2Fsecure.dst.usb.ve%2Flogin%3Fservice%3Dhttps%253A%252F%252Fwww.sinai.did.usb.ve%252Fsinai%252Flogin&sa=D&sntz=1&usg=AOvVaw2Z-dKnxEj98V_07GVuGIeW

  https://secure.dst.usb.ve/login?service=https%3A%2F%2Flocalhost:3000%2Fsinai%2Flogin


  (method)
  passport.Authenticator<e.Handler, any, any, passport.AuthenticateOptions>
    .authenticate(strategy: string | passport.Strategy | string[],
                  callback?: passport.AuthenticateCallback | ((...args: any[]) => any) | undefined
                  ): any (+1 overload)

  Applies the nameed strategy (or strategies) to the incoming request, in order to authenticate the request.
  - If authentication is successful, the user will be logged in and populated at req.user
    and a session will be established by default.
  - If authentication fails, an unauthorized response will be sent.

  Options:

  - 'session' Save login state in session, defaults to true.
  - 'successRedirect' After successful login, redirect to given URL.
  - 'successMessage' True to store success message in req.session.messages, or a string
    to use as override message for success.
  - 'successFlash' True to flash success messages or a string to use as a flash message
    for success (overrides any from the strategy itself).
  - 'failureRedirect' After failed login, redirect to given URL.
  - 'failureMessage' True to store failure message in req.session.messages, or a string
    to use as override message for failure.
  - 'failureFlash' True to flash failure messages or a string to use as a flash message
    for failures (overrides any from the strategy itself).
  - 'assignProperty' Assign the object provided by the verify callback to given property.

  An optional callback can be supplied to allow the application to override the default manner
    in which authentication attempts are handled.
  The callback has the following signature, where user will be set to the authenticated user
    on a successful authentication attempt, or false otherwise.
  An optional info argument will be passed, containing additional details provided by the strategy's verify callback
    - this could be information about a successful authentication or a challenge message for a failed authentication.
  An optional status argument will be passed when authentication fails
    - this could be a HTTP response code for a remote authentication failure or similar.

  app.get('/protected', function(req, res, next) {
    passport.authenticate('local', function(err, user, info, status) {
      if (err) { return next(err) }
      if (!user) { return res.redirect('/signin') }
      res.redirect('/account');
    })(req, res, next);
  });
  Note that if a callback is supplied, it becomes the application's responsibility to
    log-in the user,
    establish a session,
    and otherwise perform the desired operations.

  Examples:

  passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' });

  passport.authenticate('basic', { session: false });

  passport.authenticate('twitter');

  passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' })(req, res);

  passport.authenticate('local', function(err, user) {
    if (!user) { return res.redirect('/login'); }
    res.end('Authenticated!');
  })(req, res);

  passport.authenticate('basic', { session: false })(req, res);

  app.get('/auth/twitter', passport.authenticate('twitter'), function(req, res) {
    // request will be redirected to Twitter
  });
  app.get('/auth/twitter/callback', passport.authenticate('twitter'), function(req, res) {
    res.json(req.user);
  });
*/

/* lo que guardo para saber cual fue el usuario que inicio sesion

  `user` coincide con lo que envie en el `return done(null, user)` del cas_verify
  `done` tiene arg1: posible err, arg2, resultado de la serializacion.
 */
// passport.serializeUser(function (user, done) {
//   done(null, user.correo);
// });

/* devuelve el usuario cuando necesito saber quien habia iniciado sesion

  `correo` seria lo que serialice
 */
// passport.deserializeUser(function (correo, done) {
//   done(null, <usuario completo, lo buscas en la DB>);
// });

