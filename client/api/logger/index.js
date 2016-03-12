import Http                  from '../http/index';
const  { postLog }          = Http.Logger;

const ERROR                 = 'error';
const WARN                  = 'warn';
const INFO                  = 'info';
const DEBUG                 = 'debug';

export function buildLogger(reduxState, logToConsolePredicate) {
  function logger(level, logObject) {
    logObject = {
      ...logObject,
      type: level,
      timeStamp: new Date()
    };
    if (logToConsolePredicate()) {
      console.log('unable to log to server: ', logObject);
    }
    else {
      postLog(logObject);
    }
  }

  function error(logObject) {
    logger(ERROR, logObject);
  }
  logger.ERROR = ERROR;
  logger.error = error;

  function warn(logObject) {
    logger(WARN, logObject);
  }
  logger.WARN = WARN;
  logger.warn = warn;

  function info(logObject) {
    logger(INFO, logObject);
  }
  logger.INFO = INFO;
  logger.info = info;

  function debug(logObject) {
    logger(DEBUG, logObject);
  }
  logger.DEBUG = DEBUG;
  logger.debug = debug;

  return logger;
}
