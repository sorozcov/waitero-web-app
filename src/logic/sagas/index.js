import { fork, all } from 'redux-saga/effects';
import { watchLoginStarted,watchUserInformationRequest, watchRefreshTokenStarted } from './auth';
import { watchAddUsersStarted, watchDeleteUserStarted, watchEditUsersStarted, watchUsersFetchStarted } from './users';


function* mainSaga(){
  yield all([
    fork(watchLoginStarted),
    fork(watchUserInformationRequest),
    fork(watchRefreshTokenStarted),
    
    fork(watchUsersFetchStarted),
    fork(watchAddUsersStarted),
    fork(watchEditUsersStarted),
    fork(watchDeleteUserStarted),
  ]);
};

export default mainSaga;