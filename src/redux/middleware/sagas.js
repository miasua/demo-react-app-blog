import { fork, put } from 'redux-saga/effects';

import { usersRequestSaga, requestUsers } from 'redux/modules/users';
import { postsRequestSaga } from 'redux/modules/posts';

export function* routeSagas() {
  // posts
  yield fork(postsRequestSaga);
}

export function* startup() {
  yield fork(usersRequestSaga);
  yield put(requestUsers());
}

export default function* root() {
  yield fork(startup);
  yield fork(routeSagas);
}
