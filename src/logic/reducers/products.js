import {combineReducers} from 'redux'
import omit from 'lodash/omit';
import includes from 'lodash/includes'

import * as types from '../types/products';


const byId = (state = {}, action) => {
    switch(action.type) {
        case types.PRODUCT_FETCH_COMPLETED: {
            const { entities, order } = action.payload;
            const newState = { ...state };
            order.forEach(id => {
                newState[id] = {
                    ...entities[id],
                    isConfirmed: true,
                };
            });

            return newState;
        }
        case types.PRODUCT_ADD_COMPLETED: {
            const newState = { ...state };
            newState[action.payload.id] = {
                ...action.payload,
            };
            return newState;
        }
        case types.PRODUCT_EDIT_COMPLETED: {
            const newState = { ...state };
            newState[action.payload.id] = {
                ...newState[action.payload.id],
                ...action.payload,
            };
            return newState;
        }
        case types.PRODUCT_REMOVE_STARTED: {
            return omit(state, action.payload.id);
        }
        default: {
            return state;
        }
    }
};

const order = (state = [], action) => {
    switch(action.type) {
        case types.PRODUCT_FETCH_COMPLETED: {
            return [...state, ...action.payload.order.filter(newElement => !includes(state, newElement))];
        }
        case types.PRODUCT_ADD_COMPLETED: {
            return [...state, action.payload.id];
        }
        case types.PRODUCT_REMOVE_STARTED: {
            return state.filter(id => id !== action.payload.id);
        }
        default: {
            return state;
        }
    }
};

const selected = (state = null, action) => {
    switch (action.type) {
        case types.PRODUCT_SELECTED: {
            return action.payload.id
        }
        case types.PRODUCT_DESELECTED: {
            return null
        }
        default:{
            return state
        }
    }
}

const isFetching = (state = false, action) => {
    switch(action.type) {
        case types.PRODUCT_FETCH_STARTED: {
            return true;
        }
        case types.PRODUCT_FETCH_COMPLETED: {
            return false;
        }
        case types.PRODUCT_FETCH_FAILED: {
            return false;
        }
        default: {
            return state;
        }
    }
};

const error = (state = null, action) => {
    switch(action.type) {
        case types.PRODUCT_FETCH_FAILED: {
            return action.payload.error;
        }
        case types.PRODUCT_FETCH_STARTED: {
            return null;
        }
        case types.PRODUCT_FETCH_COMPLETED: {
            return null;
        }
        default: {
            return state;
        }
    }
};


export default combineReducers({
    byId,
    order,
    selected,
    isFetching,
    error,
});

export const getProduct = (state, id) => state.byId[id];
export const getProducts = state => state.order.map(id => getProduct(state, id));
export const getSelectedProduct = (state) => state.selected;
export const isFetchingProducts = state => state.isFetching;
export const getProductsError = state => state.error;