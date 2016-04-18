var express         = require('express');
var path            = require('path');

function noop() {};

// Logging
var logger          = {
  debug:  noop,
  error:  noop,
  info:   noop,
  warn:   noop
};
var serverLogger    = logger;
var frontendLogger  = logger;

// Create Server
var app = express();

// Apply common server functionality
require('./server/common')(app, __dirname, serverLogger, frontendLogger);

app.get('/bundle.js', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/bundle.js'));
});

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Start application
// Optional port override with environment variable SERVER_PORT
serverLogger.info('Server process.env.SERVER_PORT: ' + process.env.SERVER_PORT);
var portNumber = process.env.SERVER_PORT || 8080;
app.listen(portNumber, function(err) {
  if (err) {
      console.log(err);
      return;
  }

  serverLogger.info('Server Listening at port ' + portNumber);
});
