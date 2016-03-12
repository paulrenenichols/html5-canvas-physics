import * as Auth              from './auth';
import * as Config            from './config';
import * as HeartBeat         from './heartBeat';
import * as LifeCycle         from './lifeCycle';
import * as Logger            from './logger';
import * as UserInterface     from './userInterface';
import * as UserSettings      from './userSettings';

const ThunkActions = {
  Auth,
  Config,
  HeartBeat,
  LifeCycle,
  Logger,
  UserInterface,
  UserSettings
};

export default ThunkActions;
