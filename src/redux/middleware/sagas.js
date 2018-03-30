import { fork, put } from 'redux-saga/effects';

import { usersRequestSaga, requestUsers } from 'redux/modules/users';
import { postsRequestSaga, requestPosts } from 'redux/modules/posts';
import { commentsRequestSaga } from 'redux/modules/post'

export function* routeSagas() {
  // Post
  yield fork(commentsRequestSaga);
}

export function* startup() {
  // fetch users
  yield fork(usersRequestSaga);
  yield put(requestUsers());
  // fetch posts
  yield fork(postsRequestSaga);
  yield put(requestPosts());
}

export default function* root() {
  yield fork(startup);
  yield fork(routeSagas);
}
