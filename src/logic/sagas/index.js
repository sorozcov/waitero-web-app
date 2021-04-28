import { fork, all } from 'redux-saga/effects';
import { watchLoginStarted,watchUserInformationRequest, watchRefreshTokenStarted } from './auth';
import { watchAddUsersStarted, watchDeleteUserStarted, watchEditUsersStarted, watchUsersFetchStarted } from './users';

import {watchProductsFetch, watchAddProduct} from './products'
import {watchMenusFetch, watchAddMenu} from "./menus";
import { watchFetchRestaurants, watchAddRestaurant } from './restaurants';

function* mainSaga(){
  yield all([
    fork(watchLoginStarted),
    fork(watchUserInformationRequest),
    fork(watchRefreshTokenStarted),

    fork(watchUsersFetchStarted),
    fork(watchAddUsersStarted),
    fork(watchEditUsersStarted),
    fork(watchDeleteUserStarted),
    fork(watchRefreshTokenStarted),
    fork(watchProductsFetch),
    fork(watchAddProduct),
    fork(watchMenusFetch),
    fork(watchAddMenu),

    fork(watchFetchRestaurants),
    fork(watchAddRestaurant)
  ]);
};

export default mainSaga;