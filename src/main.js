import 'Styles/style.scss';
import '@blueprintjs/core/dist/blueprint.css';

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux/configureStore';
import { FocusStyleManager } from '@blueprintjs/core';

import rootSaga from 'redux/middleware/sagas';
import Routes from './routes.js';


FocusStyleManager.onlyShowFocusOnTabs();

const store = configureStore();
store.runSaga(rootSaga);

render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);
