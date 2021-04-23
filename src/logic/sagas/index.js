import { fork, all } from 'redux-saga/effects';
import { watchLoginStarted,watchUserInformationRequest, watchRefreshTokenStarted } from './auth';


function* mainSaga(){
  yield all([
    fork(watchLoginStarted),
    fork(watchUserInformationRequest),
    fork(watchRefreshTokenStarted)
  ]);
};

export default mainSaga;