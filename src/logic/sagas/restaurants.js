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
import * as actions from '../actions/restaurants';
import * as types from '../types/restaurants';
import * as schemas from '../schemas/restaurants';
import * as selectors from '../../logic/reducers';

function* fetchRestaurants(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if(isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
                fetch,
                `${API_BASE_URL}/restaurants/`,
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
                    entities: { restaurants },
                    result
                } = normalize(jsonResult, schemas.restaurants);

                yield put(
                    actions.completeFetchingRestaurants(restaurants, result)
                );

            }else {
                const jsonError = yield response.json();
                console.log(jsonError);
                
                yield put(actions.failFetchingRestaurants('Falló al traer restaurantes'));
            };
        };
    } catch(error) {
        console.log(error);
        yield put(actions.failFetchingRestaurants('Falló al traer restaurantes'));
    };
};

export function* watchFetchRestaurants() {
    yield takeEvery(
        types.FETCH_RESTAURANTS_STARTED,
        fetchRestaurants
    );
};

function* addRestaurant(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const { restaurant } = action.payload;
            console.log(restaurant)

            const response = yield call(
                fetch,
                `${API_BASE_URL}/restaurants/`,
                {
                    method: 'POST',
                    body: JSON.stringify({restaurant}),
                    headers:{
                        'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`,
                    },
                }
            );

            if (response.status <= 300) {
                const restaurant = yield response.json();
                yield put(actions.completeAddingRestaurant(restaurant));
            } else {
                yield put(actions.failAddingRestaurant('Falló al crear el restaurante'));
            }
        }
    } catch(error) {
        yield put(actions.failAddingRestaurant('Falló al crear el restaurante'));
    };
};

export function* watchAddRestaurant() {
    yield takeEvery(
        types.ADD_RESTAURANT_STARTED,
        addRestaurant
    );
};