import { combineReducers } from 'redux';

import weathers from './weathers';

const rootReducers = () =>
  combineReducers({
    weathers,
  });

export default rootReducers;
