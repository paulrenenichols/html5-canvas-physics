import _ from 'lodash';

import * as RawConfig         from './config';
import * as RawUserInterface  from './userInterface';

function organizeActionTypesAndCreators(rawActionTypesAndCreators) {
  return _.reduce(rawActionTypesAndCreators, function(typesAndCreators, property, key) {
    if (_.isString(property)) {
      typesAndCreators.Types[key] = property;
    }
    else if (_.isFunction(property)) {
      typesAndCreators.Creators[key] = property;
    }
    return typesAndCreators;
  }, {
    Creators: {},
    Types: {}
  });
}

const Actions = {
  Config:           organizeActionTypesAndCreators(RawConfig),
  UserInterface:    organizeActionTypesAndCreators(RawUserInterface)
};

export default Actions;
