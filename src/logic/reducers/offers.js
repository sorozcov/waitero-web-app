import { combineReducers } from 'redux';

import omit from 'lodash/omit';
import union from 'lodash/union';

import * as types from '../types/offers';


const byId = (state = {}, action) => {
    switch (action.type) {
        case types.OFFER_FETCH_COMPLETED:
            {
                const { entities, order } = action.payload;
                const newState = {...state };
                order.forEach(id => {
                    newState[id] = {
                        ...entities[id],
                    };
                });
                return newState;
            }
        case types.OFFER_ADD_COMPLETED:
            {
                const offer = action.payload;
                state[offer.uid] = {
                    ...offer,
                };
                return state;
            }
        case types.OFFER_EDIT_COMPLETED:
            {
                return {
                    ...state,
                    [action.payload.id]: {
                        ...state[action.payload.id],
                        ...action.payload,
                    },
                };
            }
        case types.OFFER_REMOVE_COMPLETED:
            {
                return omit(state, action.payload.uid);
            }
        default:
            {
                return state;
            }
    }
};

const order = (state = [], action) => {
    switch (action.type) {
        case types.OFFER_FETCH_COMPLETED:
            {
                return union(action.payload.order);
            }
        case types.OFFER_ADD_COMPLETED:
            {
                return [...state, action.payload.uid];
            }
        case types.OFFER_REMOVE_COMPLETED:
            {
                return state.filter(id => id !== action.payload.uid);
            }
        default:
            {
                return state;
            }
    }
};

const isFetching = (state = false, action) => {
    switch (action.type) {
        case types.OFFER_FETCH_STARTED:
            {
                return true;
            }
        case types.OFFER_FETCH_COMPLETED:
            {
                return false;
            }
        case types.OFFER_FETCH_FAILED:
            {
                return false;
            }
        default:
            {
                return state;
            }
    }
};

const isAdding = (state = false, action) => {
    switch (action.type) {
        case types.OFFER_ADD_STARTED:
            {
                return true;
            }
        case types.OFFER_ADD_COMPLETED:
            {
                return false;
            }
        case types.OFFER_ADD_FAILED:
            {
                return false;
            }
        default:
            {
                return state;
            }
    }
};

const isEditing = (state = false, action) => {
    switch (action.type) {
        case types.OFFER_EDIT_STARTED:
            {
                return true;
            }
        case types.OFFER_EDIT_COMPLETED:
        case types.OFFER_EDIT_FAILED:
            {
                return false;
            }
        default:
            {
                return state;
            }
    }
};

const isRemoving = (state = false, action) => {
    switch (action.type) {
        case types.OFFER_REMOVE_STARTED:
            {
                return true;
            }
        case types.OFFER_REMOVE_COMPLETED:
            {
                return false;
            }
        case types.OFFER_REMOVE_FAILED:
            {
                return false;
            }
        default:
            {
                return state;
            }
    }
};

const addStatus = (state = null, action) => {
    switch (action.type) {
        case types.OFFER_ADD_COMPLETED:
            {
                return "COMPLETED";
            }
        case types.OFFER_ADD_FAILED:
            {
                return "FAILED";
            }
        case types.OFFER_ADD_CLEAR:
            {
                return null
            }
        default:
            {
                return state;
            }
    }
}

const error = (state = null, action) => {
    switch (action.type) {
        case types.OFFER_FETCH_FAILED: //FETCH
        case types.OFFER_ADD_FAILED: //ADD
        case types.OFFER_EDIT_FAILED: //EDIT
        case types.OFFER_REMOVE_FAILED: //REMOVE
            {
                return action.payload.error;
            }
        case types.OFFER_FETCH_STARTED:
        case types.OFFER_FETCH_COMPLETED:
        case types.OFFER_ADD_STARTED:
        case types.OFFER_ADD_COMPLETED:
        case types.OFFER_EDIT_STARTED:
        case types.OFFER_EDIT_COMPLETED:
        case types.OFFER_REMOVE_STARTED:
        case types.OFFER_REMOVE_COMPLETED:
            {
                return null;
            }
        default:
            {
                return state;
            }
    }
};


const offers = combineReducers({
    byId,
    order,
    isFetching,
    isAdding,
    isEditing,
    isRemoving,
    error,
    addStatus,
});

export default offers;

export const getOffer = (state, id) => state.byId[id];
export const getOffers = state => state.order.map(id => getOffer(state, id));
export const isFetchingOffers = state => state.isFetching;
export const isAddingOffers = state => state.isAdding;
export const isEditingOffers = state => state.isEditing;
export const isRemovingOffers = state => state.isRemoving;
export const getOffersError = state => state.error;
export const getAddStatus = state => state.addStatus;