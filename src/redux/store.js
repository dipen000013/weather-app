import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import { routerMiddleware as createRouterMiddleware } from 'connected-react-router';
import logger from 'redux-logger';

import { history } from '../utils/history';
import rootReducer from './reducers';

const middleware = [];

if (process.env.NODE_ENV === `development`) {
  middleware.push(logger);
}

// const routerMiddleware = createRouterMiddleware(history);
// middleware.push(routerMiddleware);

export default createStore(
  rootReducer(history),
  applyMiddleware(thunk, ...middleware),
);
