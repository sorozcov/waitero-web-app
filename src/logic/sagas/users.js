import {
    call,
    takeEvery,
    put,
    select,
  } from 'redux-saga/effects';

import { normalize } from 'normalizr';
import API_BASE_URL  from './settings/apibaseurl';
import * as actions from '../../logic/actions/users';
import * as types from '../types/users';
import * as schemas from '../schemas/users';
import * as selectors from '../reducers';




function* usersFetchStarted(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);
        
        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
              fetch,
              `${API_BASE_URL}/users/`,
              {
                method: 'GET',
                headers:{
                  'Content-Type': 'application/json',
                  'Authorization': `JWT ${token}`,
                },
              }
            );

            if (response.status <= 300) {
                const jsonResult = yield response.json();
                
                const {
                  entities: { users },
                  result,
                } = normalize(jsonResult, schemas.users);

                yield put(actions.completeFetchingUsers(users, result));
            } else {
                yield put(actions.failFetchingUsers('Falló el fetch'));        
            }
        }
    } catch (error) {
        yield put(actions.failFetchingUsers('Falló el fetch'));
    }
}

export function* watchUsersFetchStarted(){
    yield takeEvery(
        types.USERS_FETCH_STARTED,
        usersFetchStarted,
    );
}


function* addUser(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const {content,user} = action.payload;
            
            const response = yield call(
                fetch,
                `${API_BASE_URL}/users/`,
                {
                method: 'POST',
                body: JSON.stringify({content,user}),
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${token}`,
                },
                }
            );

            if (response.status <= 300) {
                const user = yield response.json();
                yield put(actions.completeAddingUser(user));
            } else {
                yield put(actions.failAddingUser('Falló al crear el usuario'));
            }
        }
    } catch (error) {
        yield put(actions.failAddingUser('Falló al crear el usuario'));
    }
}

export function* watchAddUsersStarted() {
    yield takeEvery(
        types.USER_ADD_STARTED,
        addUser,
    );
}


function* editUser(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const {content,user} = action.payload;
            
            const response = yield call(
                fetch,
                `${API_BASE_URL}/users/`,
                {
                method: 'POST',
                body: JSON.stringify({content,user}),
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${token}`,
                },
                }
            );

            if (response.status <= 300) {
                const user = yield response.json();
                yield put(actions.completeEditingUser(user));
            } else {
                yield put(actions.failEditingUser('Falló al editar el usuario'));
            }
        }
    } catch (error) {
        yield put(actions.failEditingUser('Falló al editar el usuario'));
    }
}

export function* watchEditUsersStarted() {
    yield takeEvery(
        types.USER_EDIT_STARTED,
        editUser,
    );
}


function* deleteUserStarted(action){
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const {content,user} = action.payload;
            
            const response = yield call(
                fetch,
                `${API_BASE_URL}/users/`,
                {
                method: 'POST',
                body: JSON.stringify({content,user}),
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${token}`,
                },
                }
            );

            if (response.status <= 300) {
                const user = yield response.json();
                yield put(actions.completeRemovingUser(user.id));
            } else {
                yield put(actions.failRemovingUser(action.payload.uid, 'Falló el remove de usuario'));
            }
        }
    } catch (error) {
        yield put(actions.failRemovingUser(action.payload.uid, 'Falló el remove de usuario'));
    }
}

export function* watchDeleteUserStarted() {
    yield takeEvery(
        types.USER_REMOVE_STARTED,
        deleteUserStarted,
    )
}