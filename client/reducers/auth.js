import { fromJS }   from 'immutable';
import Actions      from '../actions/index';
const  { Types }    = Actions.UserInterface;

const initialState = fromJS({
  user: {}
});

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
    case Types.UI_ACTIVE_SESSION:
    case Types.UI_LOGIN_SUCCESS:
      return state.set('user', fromJS(action.user));

    case Types.UI_LOGOUT:
      return initialState;

    default:
      return state;
  }
}
