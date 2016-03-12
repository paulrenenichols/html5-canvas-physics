// Actions
import Actions                        from '../actions/index';
const  { configAdd }                  = Actions.Config.Creators;

// API
import API                            from '../api/index';
const  { fetchConfig }                = API.Http.Config;

export function loadConfig() {
  return function loadConfigClosure(dispatch, reduxState, logger) {
    logger.info({
      message: 'loadConfig() fetching'
    });
    return fetchConfig()
      .then(
        function onFulfillment(config) {
          dispatch(configAdd(config));
          logger.info({
            message: 'loadConfig() onFulfillment() FINISHED fetching'
          });
          return config;
        },
        function onRejection(reason) {
          logger.error({
            message: 'loadConfig() onRejection()',
            reason
          });
        }
      );
  };
}
