import { take, put, call  } from 'redux-saga/effects';
import { handleActions } from 'redux-actions';

import { APP_NAMESPACE } from 'shared/constants/application';
import { UNLOADED, LOADING, LOADED, ERROR } from 'shared/constants/statuses';
import callApi from 'redux/middleware/api';
import { parsePosts } from 'parsers/posts';

const namespace = `${APP_NAMESPACE}/posts`;

// Initial State
const initialState = {
  postsIsLoading: false,
  postsStatus: UNLOADED,
  postsCallErrorMessage: null,
  postList: [],
  recievedAt: null
};

// Actions
const POSTS_REQUEST = `${namespace}/POSTS_REQUEST`;
const POSTS_REQUEST_SUCCESS = `${namespace}/POSTS_REQUEST_SUCCESS`;
const POSTS_REQUEST_FAILURE = `${namespace}/POSTS_REQUEST_FAILURE`;
const POSTS_CLEAR = `${namespace}/POSTS_CLEAR`;

// Action Creators
export const requestPosts = () => {
  return {
    type: POSTS_REQUEST
  };
};

export const receivePosts = (json) => {
  return {
    type: POSTS_REQUEST_SUCCESS,
    payload: json,
    meta: {
      recievedAt: Date.now()
    }
  };
};

export const requestPostsError = (message) => {
  return {
    type: POSTS_REQUEST_FAILURE,
    error: message,
    meta: {
      recievedAt: Date.now()
    }
  };
};

export const clearPosts = () => {
  return {
    type: POSTS_CLEAR
  };
};

// Sagas
export function * postsRequestSaga() {
  while (true) { // eslint-disable-line no-constant-condition
    yield take(POSTS_REQUEST);
    try {
      const json = yield call(callApi, 'GET', '/posts');
      const successAction = receivePosts(json);
      yield put(successAction);
    } catch (error) {
      const failureAction = requestPostsError(error);
      yield put(failureAction);
    }
  }
}

// Reducer
const posts = handleActions({
  [POSTS_REQUEST]: (state, action) => {
    return {
      ...state,
      postsIsLoading: true,
      postsStatus: LOADING
    };
  },
  [POSTS_REQUEST_SUCCESS]: (state, action) => {
    const postList = parsePosts(action.payload);
    return {
      ...state,
      postsIsLoading: false,
      postsStatus: LOADED,
      postList,
      recievedAt: action.meta.recievedAt
    };
  },
  [POSTS_REQUEST_FAILURE]: (state, action) => {
    return {
      ...state,
      postsIsLoading: false,
      postsStatus: ERROR,
      recievedAt: action.meta.recievedAt
    };
  },
  [POSTS_CLEAR]: (state, action) => {
    return initialState;
  }
}, initialState);


export default posts;
