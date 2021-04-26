import { fork, all } from 'redux-saga/effects';
import { watchLoginStarted,watchUserInformationRequest, watchRefreshTokenStarted } from './auth';

import {watchProductsFetch, watchAddProduct} from './products'
import {watchMenusFetch, watchAddMenu} from "./menus";

function* mainSaga(){
  yield all([
    fork(watchLoginStarted),
    fork(watchUserInformationRequest),
    fork(watchRefreshTokenStarted),
    fork(watchProductsFetch),
    fork(watchAddProduct),
    fork(watchMenusFetch),
    fork(watchAddMenu)
  ]);
};

export default mainSaga;