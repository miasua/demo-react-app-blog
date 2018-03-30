import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import sagaMonitor from 'redux-saga';
import createHistory from 'history/createBrowserHistory';

import rootReducer from 'redux/modules/reducer';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function configureStore() {
  const history = createHistory();
  const routerMid = routerMiddleware(history);
  const sagaMiddleware = createSagaMiddleware({sagaMonitor});
  return {
    ...createStore(rootReducer, composeEnhancers(applyMiddleware(sagaMiddleware, routerMid))),
    runSaga: sagaMiddleware.run
  };
}
