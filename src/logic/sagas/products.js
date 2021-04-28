import {
    call,
    takeEvery,
    put,
    select
} from 'redux-saga/effects';
import {normalize} from 'normalizr';

import * as constants from '../../constants/data';
import * as actions from '../actions/products';
import * as types from '../types/products';
import * as schemas from '../schemas/products';
import * as selectors from '../../logic/reducers'

function* fetchProducts(action) {
    try{
        const response = yield call(
            fetch,
            `${constants.API_BASE_URL_WEB}/products/`,
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
                entities: { product },
                result
            } = normalize(jsonResult, schemas.productListSchema);

            yield put(
                actions.completeFetchingProduct(product, result)
            )

        }else{
            const jsonError = yield response.json();
            console.log(jsonError)
        }
    }catch (error) {
        console.log(error)
    }
}

export function* watchProductsFetch() {
    yield takeEvery(
        types.PRODUCT_FETCH_STARTED,
        fetchProducts
    )
}

function* addProduct(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);

        if (isAuth) {
            const token = yield select(selectors.getAuthToken);
            console.log(token)
            const response = yield call(
                fetch,
                `${constants.API_BASE_URL_WEB}/products/`,
                {
                    method: 'POST',
                    body: JSON.stringify(
                        {
                            name: action.payload.productName,
                            price: action.payload.productPrice,
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
                    actions.completeAddingProduct(
                        action.payload.id,
                        jsonResult,
                    ),
                );
            } else {
                const jsonError = yield response.json()
                yield put(actions.failAddingProduct(jsonError))
            }
        }
    } catch (error) {
        console.log("ERROR REVIEW", error.message)
    }
}

export function* watchAddProduct() {
    yield takeEvery(
        types.PRODUCT_ADD_STARTED,
        addProduct,
    );
}