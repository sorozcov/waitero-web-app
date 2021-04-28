import * as types from '../types/offers';

//FETCH
export const startFetchingOffers = () => ({
    type: types.OFFER_FETCH_STARTED,
});

export const completeFetchingOffers = (entities, order) => ({
    type: types.OFFER_FETCH_COMPLETED,
    payload: {
        entities,
        order,
    },
});

export const failFetchingOffers = error => ({
    type: types.OFFER_FETCH_FAILED,
    payload: {
        error,
    },
});

//ADD
export const startAddingOffer = offer => ({
    type: types.OFFER_ADD_STARTED,
    payload: offer,
});

export const completeAddingOffer = offer => ({
    type: types.OFFER_ADD_COMPLETED,
    payload: offer,
});

export const failAddingOffer = error => ({
    type: types.OFFER_ADD_FAILED,
    payload: {
        error,
    },
});

export const clearAddingOffer = () => ({
    type: types.OFFER_ADD_CLEAR,
})

//EDIT
export const startEditingOffer = (offer, id) => ({
    type: types.OFFER_EDIT_STARTED,
    payload: {
        offer,
        id
    }
});

export const completeEditingOffer = offer => ({
    type: types.OFFER_EDIT_COMPLETED,
    payload: offer,
});

export const failEditingOffer = (id, error) => ({
    type: types.OFFER_EDIT_FAILED,
    payload: {
        id,
        error,
    },
});

//REMOVE
export const startRemovingOffer = uid => ({
    type: types.OFFER_REMOVE_STARTED,
    payload: {
        uid,
    },
});

export const completeRemovingOffer = uid => ({
    type: types.OFFER_REMOVE_COMPLETED,
    payload: {
        uid,
    },
});

export const failRemovingOffer = (uid, error) => ({
    type: types.OFFER_REMOVE_FAILED,
    payload: {
        uid,
        error,
    },
});
