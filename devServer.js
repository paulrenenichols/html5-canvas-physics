var express         = require('express');
var path            = require('path');
var winston         = require('winston');
var fs              = require('fs-extra');
var path            = require('path');

function createFileLogger(loggerName, logLevel, filename) {

  var directory = path.dirname(filename);
  fs.emptyDirSync(directory);

  var transports =[
    new (winston.transports.File)({
      level: logLevel,
      colorize: true,
      prettyPrint: true,
      timestamp : function() {
        var toReturn = new Date() + ', ' + loggerName;
        if (toReturn && process.env.NODE_ENV) {
          toReturn += ' ' + process.env.NODE_ENV;
        }
        return toReturn;
      },
      filename: filename,
      maxsize: 16 * 1024 * 1024,
      tailable: true,
      json: false,
      formatter: function (args) {
        return args.level.toUpperCase() + ': ' + args.timestamp() + ': ' + args.message + ' ' + JSON.stringify(args);
      }
    })
  ];

  return new (winston.Logger)({
    transports: transports
  });
};



// Logging
var serverLogger    = createFileLogger('server', 'info', 'logs/server/server.txt');
var frontendLogger  = createFileLogger('frontend', 'info', 'logs/frontend/frontend.txt');

// Create Server
var app = express();

// Set up Dev Server functionality (hot reloading of redux app)
require('./server/dev')(app);
// Apply common server functionality
require('./server/common')(app, __dirname, serverLogger, frontendLogger);

app.get('*', function(req, res) {
  res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Start application
// Optional port override with environment variable SERVER_PORT
serverLogger.info('Dev Server process.env.SERVER_PORT: ' + process.env.SERVER_PORT);
var portNumber = process.env.SERVER_PORT || 8080;
app.listen(portNumber, 'localhost', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  serverLogger.info('Dev Server Listening at port ' + portNumber);
});
