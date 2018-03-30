import { take, put, call  } from 'redux-saga/effects';
import { handleActions } from 'redux-actions';

import { APP_NAMESPACE } from 'shared/constants/application';
import { UNLOADED, LOADING, LOADED, ERROR } from 'shared/constants/statuses';
import callApi from 'redux/middleware/api';
import { parseUsers } from 'parsers/users';

const namespace = `${APP_NAMESPACE}/users`;

// Initial State
const initialState = {
  isLoading: false,
  status: UNLOADED,
  errorMessage: null,
  list: [],
  recievedAt: null
};

// Actions
const USERS_REQUEST = `${namespace}/USERS_REQUEST`;
const USERS_REQUEST_SUCCESS = `${namespace}/USERS_REQUEST_SUCCESS`;
const USERS_REQUEST_FAILURE = `${namespace}/USERS_REQUEST_FAILURE`;

// Action Creators
export const requestUsers = () => {
  return {
    type: USERS_REQUEST
  };
};

export const receiveUsers = (json) => {
  return {
    type: USERS_REQUEST_SUCCESS,
    payload: json,
    meta: {
      recievedAt: Date.now()
    }
  };
};

export const requestUsersError = (message) => {
  return {
    type: USERS_REQUEST_FAILURE,
    error: message,
    meta: {
      recievedAt: Date.now()
    }
  };
};

// Sagas
export function * usersRequestSaga() {
  while (true) { // eslint-disable-line no-constant-condition
    yield take(USERS_REQUEST);
    try {
      const json = yield call(callApi, 'GET', '/users');
      const successAction = receiveUsers(json);
      yield put(successAction);
    } catch (error) {
      const failureAction = requestUsersError(error);
      yield put(failureAction);
    }
  }
}

// Reducer
const users = handleActions({
  [USERS_REQUEST]: (state, action) => {
    return {
      ...state,
      isLoading: true,
      status: LOADING
    };
  },
  [USERS_REQUEST_SUCCESS]: (state, action) => {
    const list = parseUsers(action.payload);
    return {
      ...state,
      isLoading: false,
      status: LOADED,
      list,
      recievedAt: action.meta.recievedAt
    };
  },
  [USERS_REQUEST_FAILURE]: (state, action) => {
    return {
      ...state,
      isLoading: false,
      status: ERROR,
      recievedAt: action.meta.recievedAt
    };
  }
}, initialState);


export default users;
