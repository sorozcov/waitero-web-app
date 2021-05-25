import * as types from '../types/products';

export const startFetchingProduct = () => ({
    type: types.PRODUCT_FETCH_STARTED,
});
export const completeFetchingProduct = (entities, order) => ({
    type: types.PRODUCT_FETCH_COMPLETED,
    payload: {
        entities,
        order,
    },
});
export const failFetchingProduct = error => ({
    type: types.PRODUCT_FETCH_FAILED,
    payload: {
        error,
    },
});

export const startAddingProduct = product => ({
    type: types.PRODUCT_ADD_STARTED,
    payload: product,
});
export const completeAddingProduct = (oldId, product) => ({
    type: types.PRODUCT_ADD_COMPLETED,
    payload: {
        oldId,
        product,
    },
});
export const failAddingProduct = (oldId, error) => ({
    type: types.PRODUCT_ADD_FAILED,
    payload: {
        oldId,
        error,
    },
});

export const startEditingProduct = user => ({
    type: types.PRODUCT_EDIT_STARTED,
    payload: user,
});
export const completeEditingProduct = user => ({
    type: types.PRODUCT_EDIT_COMPLETED,
    payload: user,
});
export const failEditingProduct = (id, error) => ({
    type: types.PRODUCT_EDIT_FAILED,
    payload: {
        id,
        error,
    },
});

export const selectProduct = (id) => ({
    type: types.PRODUCT_SELECTED,
    payload: {
        id
    }
});

export const deselectProduct = () => ({
    type: types.PRODUCT_DESELECTED
});