import { fromJS, is }   from 'immutable';
import Const            from '../const/index';
const  UserInterface    = Const.UserInterface;

export function buildReduxState(getState) {
  let ReduxState = {
    getWhole() {
      return getState();
    }
  };

  // Auth State
  ReduxState.Auth = {
    getWhole() {
      const { getWhole } = ReduxState;
      return getWhole().get('auth');
    },
    getEmail() {
      return ReduxState.Auth.User.getEmail();
    },
    activeUserSession() {
      return !is(ReduxState.Auth.User.getWhole(), fromJS({}));
    }
  };
  ReduxState.Auth.User = {
    getWhole() {
      const { getWhole } = ReduxState.Auth;
      return getWhole().get('user');
    },
    getEmail() {
      return this.getWhole().get('username');
    },
    getFirstName() {
      return this.getWhole().get('first_name');
    },
    getLastName() {
      return this.getWhole().get('last_name');
    }
  };

  // Config State
  ReduxState.Config = {
    getWhole() {
      const { getWhole } = ReduxState;
      return getWhole().get('config');
    }
  };

  // UserInterface State
  ReduxState.UserInterface = {
    getWhole() {
      const { getWhole } = ReduxState;
      return getWhole().get('userInterface');
    },
    getAppState() {
      return this.getWhole().get('appState');
    },
    getNetworkState() {
      return this.getWhole().get('networkState');
    },
  };
  ReduxState.UserInterface.AppState = {
    inAppStateInit() {
      return ReduxState.UserInterface.getAppState() === UserInterface.UI_APP_STATE_INIT;
    },
    inAppStateLoggedIn() {
      return ReduxState.UserInterface.getAppState() === UserInterface.UI_APP_STATE_LOGGED_IN;
    },
    inAppStateLoggedOut() {
      return ReduxState.UserInterface.getAppState() === UserInterface.UI_APP_STATE_LOGGED_OUT;
    },
    inAppStateActiveSession() {
      return ReduxState.UserInterface.getAppState() === UserInterface.UI_APP_STATE_ACTIVE_SESSION;
    }
  };
  ReduxState.UserInterface.NetworkState = {
    networkIsConnected() {
      return ReduxState.UserInterface.getNetworkState() === UserInterface.UI_NETWORK_STATE_CONNECTED;
    },
    networkIsDisconnected() {
      return ReduxState.UserInterface.getNetworkState() === UserInterface.UI_NETWORK_STATE_DISCONNECTED;
    }
  };

  return ReduxState;
}

const ReduxState = {
  buildReduxState
};

export default ReduxState;
