import {
    call,
    takeEvery,
    put,
    select,
} from 'redux-saga/effects';

import { normalize } from 'normalizr';

import * as types from '../types/offers';
import * as selectors from '../reducers';
import * as schemas from '../schemas/offers';
import * as actions from '../../logic/actions/offers';

import API_BASE_URL  from './settings/apibaseurl';


function* offersFetchStarted(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);
        
        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const response = yield call(
              fetch,
              `${API_BASE_URL}/offers/`,
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
                  entities: { offers },
                  result,
                } = normalize(jsonResult, schemas.offers);

                yield put(actions.completeFetchingOffers(offers, result));
            } else {
                yield put(actions.failFetchingOffers('[OFFERS] Falló el fetch'));        
            }
        }
    } catch (error) {
        yield put(actions.failFetchingOffers('[OFFERS] Falló el fetch'));
    }
}

export function* watchOffersFetchStarted(){
    yield takeEvery(
        types.OFFER_FETCH_STARTED,
        offersFetchStarted,
    );
}


function* addOffer(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const offer = action.payload;
            
            const response = yield call(
                fetch,
                `${API_BASE_URL}/offers/`,
                {
                method: 'POST',
                body: JSON.stringify(offer),
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${token}`,
                },
                }
            );

            if (response.status <= 300) {
                const offer = yield response.json();
                yield put(actions.completeAddingOffer(offer));
            } else {
                yield put(actions.failAddingOffer('[OFFER] Falló el create'));
            }
        }
    } catch (error) {
        console.log("FALLO", error);
        yield put(actions.failAddingOffer('[OFFER] Falló el create'));
    }
}

export function* watchAddOffer() {
    yield takeEvery(
        types.OFFER_ADD_STARTED,
        addOffer,
    );
}


function* editOffer(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const offer = action.payload.offer;
            
            const response = yield call(
                fetch,
                `${API_BASE_URL}/offers/${action.payload.id}`,
                {
                method: 'PATCH',
                body: JSON.stringify(offer),
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${token}`,
                },
                }
            );

            if (response.status <= 300) {
                const new_offer = yield response.json();
                yield put(actions.completeEditingOffer(new_offer));
                yield put(actions.startFetchingOffers());
            } else {
                yield put(actions.failEditingOffer('[OFFER] Falló el PATCH'));
            }
        }
    } catch (error) {
        yield put(actions.failEditingOffer('[OFFER] Falló el PATCH'));
    }
}

export function* watchEditOfferStarted() {
    yield takeEvery(
        types.OFFER_EDIT_STARTED,
        editOffer,
    );
}


function* deleteOfferStarted(action){
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            const uid = action.payload.uid;
            
            const response = yield call(
                fetch,
                `${API_BASE_URL}/offers/${uid}`,
                {
                method: 'DELETE',
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization': `JWT ${token}`,
                },
                }
            );

            if (response.status <= 300) {
                yield put(actions.completeRemovingOffer(uid));
                yield put(actions.startFetchingOffers());
            } else {
                yield put(actions.failRemovingOffer(action.payload.uid, '[OFFER] Falló el remove'));
            }
        }
    } catch (error) {
        yield put(actions.failRemovingOffer(action.payload.uid, '[OFFER] Falló el remove'));
    }
}

export function* watchDeleteOfferStarted() {
    yield takeEvery(
        types.OFFER_REMOVE_STARTED,
        deleteOfferStarted,
    )
}