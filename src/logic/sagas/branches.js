import {
    call,
    takeEvery,
    put,
    race,
    all,
    delay,
    select
} from 'redux-saga/effects';
import {normalize} from 'normalizr';

import API_BASE_URL  from './settings/apibaseurl';
import * as actions from '../actions/branches';
import * as types from '../types/branches';
import * as schemas from '../schemas/branches';
import * as selectors from '../../logic/reducers';

function* fetchBranches(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if(isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/branches/`,
                {
                    method: 'GET',
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`,
                    },
                }
            );

            if(response.status === 200) {
                const jsonResult = yield response.json();
                const{
                    entities: { branches },
                    result
                } = normalize(jsonResult, schemas.branches);

                yield put(
                    actions.completeFetchingBranches(branches, result)
                );

            }else {
                const jsonError = yield response.json();
                console.log(jsonError);
                
                yield put(actions.failFetchingBranches('Falló al traer sucursales'));
            };
        };
    } catch(error) {
        console.log(error);
        yield put(actions.failFetchingBranches('Falló al traer sucursales'));
    };
};

export function* watchFetchBranches() {
    yield takeEvery(
        types.FETCH_BRANCHES_STARTED,
        fetchBranches
    );
};

function* addBranches(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const { branch } = action.payload;
            console.log(branch)

            const response = yield call(
                fetch,
                `${API_BASE_URL}/branches/`,
                {
                    method: 'POST',
                    body: JSON.stringify({branch}),
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`,
                    },
                }
            );

            if (response.status <= 300) {
                const restaurant = yield response.json();
                yield put(actions.completeAddingBranch(restaurant));
            } else {
                yield put(actions.failAddingBranch('Falló al crear la sucursal'));
            }
        }
    } catch(error) {
        yield put(actions.failAddingBranch('Falló al crear la sucursal'));
    };
};

export function* watchAddBranches() {
    yield takeEvery(
        types.ADD_BRANCH_STARTED,
        addBranches
    );
};