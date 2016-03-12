const ERROR                 = 'error';
const WARN                  = 'warn';
const INFO                  = 'info';
const DEBUG                 = 'debug';

function loggerAction(level, logObject) {
  return function logClosure(dispatch, reduxState, logger) {
    logger(level, logObject);
  }
}

function warn(logObject) {
  return loggerAction(WARN, logObject);
}

function info(logObject) {
  return loggerAction(INFO, logObject);
}

function debug(logObject) {
  return loggerAction(DEBUG, logObject);
}

function error(logObject) {
  return loggerAction(ERROR, logObject);
}

loggerAction.warn  = warn;
loggerAction.info  = info;
loggerAction.error = error;
loggerAction.debug = debug;

export const logger = loggerAction;
