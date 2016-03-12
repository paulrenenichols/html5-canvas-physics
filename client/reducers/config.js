import { fromJS }  from 'immutable';
import Actions     from '../actions/index';
const  { Types }   = Actions.Config;

const initialState = fromJS({});

export default function config(state = initialState, action = {}) {
  switch (action.type) {
    case Types.CONFIG_ADD:
      return fromJS(action.config);
    default:
      return state;
  }
}
