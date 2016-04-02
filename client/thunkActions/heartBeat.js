import co                                           from 'co';

// API
import API                                          from '../api/index';
const  { fetchApplicationServerPing }               = API.Http.Server;
const  { delayedFulfillmentPromise }                = API.Util.Promises;
const  UIStates                                     = API.Const.UserInterface;

import Actions                                      from '../actions/index';
const  { uiSetNetworkState }                        = Actions.UserInterface.Creators;

var   heartBeatCount = 5;
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

export function testConnectionAndStartHeartBeat(onDisconnect, onAttemptReconnect, onConnect) {
  return function testConnectionAndStartHeartBeatClosure(dispatch, reduxState, logger) {
    logger.info({
      message: 'testConnectionAndStartHeartBeat()'
    });

    if (typeof onDisconnect !== 'function') {
      onDisconnect = () => {};
    }
    if (typeof onConnect !== 'function') {
      onConnect = () => {};
    }
    if (typeof onAttemptReconnect !== 'function') {
      onAttemptReconnect = () => {};
    }

    co(function *heartBeat() {
      while (true) {

        if (heartBeatCount === HEART_BEAT_MIN) {
          if (reduxState.UserInterface.NetworkState.networkIsConnected()) {
            dispatch(uiSetNetworkState(UIStates.UI_NETWORK_STATE_DISCONNECTED));
          }
          onDisconnect();
          yield testConnectionAndWait(30 * 1000);
        }
        else if (heartBeatCount < HEART_BEAT_MAX) {
          if (reduxState.UserInterface.NetworkState.networkIsDisconnected()) {
            onAttemptReconnect();
          }
          yield testConnectionAndWait(1000);
        }
        else if (heartBeatCount === HEART_BEAT_MAX) {
          if (reduxState.UserInterface.NetworkState.networkIsDisconnected()) {
            dispatch(uiSetNetworkState(UIStates.UI_NETWORK_STATE_CONNECTED));
            onConnect();
            yield testConnectionAndWait(30 * 1000);
          }
          else if (reduxState.UserInterface.NetworkState.networkIsConnected()) {
            yield testConnectionAndWait(60 * 1000);
          }
        }
      }
    });
  }
}
