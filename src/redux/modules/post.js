import { take, put, call  } from 'redux-saga/effects';
import { handleActions } from 'redux-actions';

import { APP_NAMESPACE } from 'shared/constants/application';
import { UNLOADED, LOADING, LOADED, ERROR } from 'shared/constants/statuses';
import callApi from 'redux/middleware/api';
import { parseComments } from 'parsers/post';

const namespace = `${APP_NAMESPACE}/comments`;

// Initial State
const initialState = {
  commentsIsLoading: false,
  commentsStatus: UNLOADED,
  commentsCallErrorMessage: null,
  commentsList: [],
  commentsRecievedAt: null
};

// Actions
const COMMENTS_REQUEST = `${namespace}/COMMENTS_REQUEST`;
const COMMENTS_REQUEST_SUCCESS = `${namespace}/COMMENTS_REQUEST_SUCCESS`;
const COMMENTS_REQUEST_FAILURE = `${namespace}/COMMENTS_REQUEST_FAILURE`;
const COMMENTS_CLEAR = `${namespace}/COMMENTS_CLEAR`;

// Action Creators
export const requestComments = (id) => {
  return {
    type: COMMENTS_REQUEST,
    payload: {
      id
    }
  };
};

export const receiveComments = (json) => {
  return {
    type: COMMENTS_REQUEST_SUCCESS,
    payload: json,
    meta: {
      recievedAt: Date.now()
    }
  };
};

export const requestCommentsError = (message) => {
  return {
    type: COMMENTS_REQUEST_FAILURE,
    error: message,
    meta: {
      recievedAt: Date.now()
    }
  };
};

export const clearComments = () => {
  return {
    type: COMMENTS_CLEAR
  };
};

// Sagas
export function * commentsRequestSaga() {
  while (true) { // eslint-disable-line no-constant-condition
    const action = yield take(COMMENTS_REQUEST);
    const { payload: { id } } = action;
    try {
      const json = yield call(callApi, 'GET', `/post/${id}/comments`);
      const successAction = receiveComments(json);
      yield put(successAction);
    } catch (error) {
      const failureAction = requestCommentsError(error);
      yield put(failureAction);
    }
  }
}

// Reducer
const comments = handleActions({
  [COMMENTS_REQUEST]: (state, action) => {
    return {
      ...state,
      commentsIsLoading: true,
      commentsStatus: LOADING,
      commentList: []
    };
  },
  [COMMENTS_REQUEST_SUCCESS]: (state, action) => {
    const commentList = parseComments(action.payload);
    return {
      ...state,
      commentsIsLoading: false,
      commentsStatus: LOADED,
      commentList,
      commentsRecievedAt: action.meta.recievedAt
    };
  },
  [COMMENTS_REQUEST_FAILURE]: (state, action) => {
    return {
      ...state,
      commentsIsLoading: false,
      commentsStatus: ERROR,
      commentsRecievedAt: action.meta.recievedAt
    };
  },
  [COMMENTS_CLEAR]: (state, action) => {
    return initialState;
  }
}, initialState);

export default comments;
