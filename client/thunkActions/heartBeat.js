import co                                           from 'co';

import { boot,
         disconnectApplication }                    from './lifeCycle';

// API
import API                                          from '../api/index';
const  { fetchApplicationServerPing }                       = API.Http.Server;
const  { delayedFulfillmentPromise }                = API.Util.Promises;

var   heartBeatCount = 0;
const HEART_BEAT_MAX = 5;
const HEART_BEAT_MIN = 0;

function incrementHeartBeatCount () {
  if (heartBeatCount < HEART_BEAT_MAX) {
    heartBeatCount++;
  }
}

function decrementHeartBeatCount () {
  if (heartBeatCount > HEART_BEAT_MIN) {
    heartBeatCount--;
  }
}

function testConnectionAndWait(delay) {
  return Promise.all([fetchApplicationServerPing(), delayedFulfillmentPromise(delay)])
    .then(
      function onFulFillment() {
        incrementHeartBeatCount();
        return true;
      },
      function onRejection() {
        decrementHeartBeatCount();
        return false;
      }
    );
}

export function testConnectionAndStartHeartBeat() {
  return function testConnectionAndStartHeartBeatClosure(dispatch, reduxState, logger) {
    logger.info({
      message: 'testConnectionAndStartHeartBeat()'
    });

    co(function *heartBeat() {
      var applicationState;
      while (true) {
        applicationState = reduxState.UserInterface.getAppState();
        logger.info({
          message: 'testConnectionAndStartHeartBeat()',
          heartBeatCount,
          applicationState
        });

        if (heartBeatCount === HEART_BEAT_MIN) {
          yield testConnectionAndWait(100);
          if (!reduxState.UserInterface.AppState.inAppStateInit() &&  !reduxState.UserInterface.AppState.inAppStateServerDisconnected()) {
            dispatch(disconnectApplication());
          }
        }
        else if (heartBeatCount < HEART_BEAT_MAX) {
          yield testConnectionAndWait(100);
        }
        else if (heartBeatCount === HEART_BEAT_MAX) {
          if (reduxState.UserInterface.AppState.inAppStateInit() || reduxState.UserInterface.AppState.inAppStateServerDisconnected()) {
            dispatch(boot());
            yield testConnectionAndWait(1000);
          }
          else if (reduxState.UserInterface.AppState.inAppStateServerConnected()) {
            yield testConnectionAndWait(3000);
          }
          else {
            yield testConnectionAndWait(5 * 1000);
          }
        }
      }
    });
  }
}
