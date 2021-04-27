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

import * as constants from '../../constants/data';
import * as actions from '../actions/menus';
import * as types from '../types/menus';
import * as schemas from '../schemas/menus';
import * as selectors from '../../logic/reducers'

function* fetchMenus(action) {
    try{
        const response = yield call(
            fetch,
            `${constants.API_BASE_URL_WEB}/combos/`,
            {
                method:'GET',
                headers:{
                    'Content-Type':'application/json'
                },
            }
        );
        if (response.status === 200){
            const jsonResult = yield response.json();
            const{
                entities: { menu },
                result
            } = normalize(jsonResult, schemas.menuListSchema);

            yield put(
                actions.completeFetchingMenu(menu, result)
            )

        }else{
            const jsonError = yield response.json();
            console.log(jsonError)
        }
    }catch (error) {
        console.log(error)
    }
}

export function* watchMenusFetch() {
    yield takeEvery(
        types.MENU_FETCH_STARTED,
        fetchMenus
    )
}

function* addMenu(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            console.log(token)
            const response = yield call(
                fetch,
                `${constants.API_BASE_URL_WEB}/combos/`,
                {
                    method: 'POST',
                    body: JSON.stringify(
                        {
                            name: action.payload.menuName,
                            price: action.payload.menuPrice,
                            'branch': [1]
                        }
                    ),
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`,
                    },
                }
            );
            if (response.status === 201) {
                const jsonResult = yield response.json();
                yield put(
                    actions.completeAddingMenu(
                        action.payload.id,
                        jsonResult,
                    ),
                );
            } else {
                const jsonError = yield response.json()
                yield put(actions.failAddingMenu(jsonError))
            }
        }
    } catch (error) {
        console.log("ERROR REVIEW", error.message)
    }
}

export function* watchAddMenu() {
    yield takeEvery(
        types.MENU_ADD_STARTED,
        addMenu,
    );
}