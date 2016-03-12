var _             = require('lodash');
var bodyParser    = require('body-parser');
var cookieParser  = require('cookie-parser');
var cookieSession = require('cookie-session');
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var urljoin       = require('url-join');
var request       = require('superagent');
var express       = require('express');

module.exports = function(app, rootDirectory, serverLogger, frontendLogger) {

  function passportLocalStrategyHandler(username, password, done) {
    serverLogger.info('app.post(\'/login/auth)\': passportLocalStrategyHandler()');
  }

  passport.use(new LocalStrategy(passportLocalStrategyHandler));
  passport.serializeUser(function(user, done) {
    done(null, user);
  });
  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  app.use(cookieParser());
  app.use(cookieSession({
    name: 'webpack-redux-react-seed',
    secret: 'seedy project',
    signed: true,
    maxAge: 24 * 60 * 60 * 1000 // one day for time out
  }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());
  app.use(passport.initialize());
  app.use(passport.session());

  app.post('/login/auth',
    function(req, res, next) {
      serverLogger.info('app.post(\'/login/auth)\'');
      if (req.body && req.body.username === 'tvs@dropoff.com' && req.body.password === 'wdn2wf2016') {
        serverLogger.info('app.post(\'/login/auth)\': tv login');
        req.session = null;
        req.sessionOptions.maxAge = 60000 * 60 * 24 * 365;
      }
      next();
    },
    function (req, res, next) {
      serverLogger.info('app.post(\'/login/auth)\': passport local auth ', JSON.stringify(req.body, null, 2));
      passport.authenticate('local', function (err, user) {
        if (err) {
          serverLogger.info('app.post(\'/login/auth)\': passport local auth: error: ', JSON.stringify(err, null, 2));
          next(err);
        }

        serverLogger.info('app.post(\'/login/auth)\': passport local auth ');
        if (user) {
          serverLogger.info('app.post(\'/login/auth)\': passport local auth user exists ', JSON.stringify(user, null, 2));
          serverLogger.info('app.post(\'/login/auth)\': passport local auth attempting login');
          req.login(user, function (err) {
            if (err) {
              serverLogger.info('app.post(\'/login/auth)\': passport local auth attempting login: login error ', JSON.stringify(err, null, 2));
              next(err);
            }
            serverLogger.info('app.post(\'/login/auth)\': passport local auth attempting login: no error');
            next();
          });
        }
        else {
          serverLogger.info('app.post(\'/login/auth)\': passport local auth no user found');
          next();
        }
      })(req, res, next);
    },
    function(req, res) {
      serverLogger.info('app.post(\'/login/auth)\': after passport local auth');
      if (req.user) {
        serverLogger.info('app.post(\'/login/auth)\': after passport local auth: req.user exists: ', JSON.stringify(req.user, null, 2));
        res.status(200).json({
          user: req.user,
          loggedIn: true,
          timeToLive: req.sessionOptions.maxAge
        });
      }
      else {
        serverLogger.info('app.post(\'/login/auth)\': after passport local auth: req.user NOT FOUND');
        res.status(200).json({
          loggedIn: false
        });
      }
    }
  );

  app.post('/login/active',
    function(req, res) {
      serverLogger.info('route, /login/active, req.session ', JSON.stringify(req.session, null, 2));
      serverLogger.info('route, /login/active, req.user ', JSON.stringify(req.user, null, 2));

      if (req.user) {
        res.status(200).json({
          user: req.user,
          loggedIn: true
        });
      }
      else {
        res.status(200).json({
          loggedIn: false
        });
      }
    }
  );


  app.post('/login/logout',
    function(req, res) {
      serverLogger.info('route, /login/logout, req.session ', JSON.stringify(req.session, null, 2));
      serverLogger.info('route, /login/logout, req.user ', JSON.stringify(req.user, null, 2));

      req.logOut();
      res.status(200).json({});
    }
  );

  app.post('/logger', function (req, res) {
    switch (req.body.type) {
      case 'error':
        frontendLogger.error(req.body.message, req.body);
        break;

      case 'warn':
        frontendLogger.warn(req.body.message, req.body);
        break;

      case 'info':
        frontendLogger.info(req.body.message, req.body);
        break;

      case 'debug':
        frontendLogger.debug(req.body.message, req.body);
        break;

      default:
        frontendLogger.error(req.body.message, req.body);
    }

    res.status(200).end();
  });

  app.use('/ping', function (req, res) {
    res.status(200).end();
  });

  app.use('/lib', express.static(rootDirectory + '/lib'));

  app.use('/images', express.static(rootDirectory + '/public/images'));

  app.get('/api/*', function (req, res) {
    var proxyUrl = req.originalUrl.replace(/\/?api/, '');
  });

  app.put('/api/*', function (req, res) {
    var proxyUrl = req.originalUrl.replace(/\/?api/, '');
  });

  app.get('/config', function (req, res) {
    var config = {
    };

    res.status(200).json(config);
  });
}
