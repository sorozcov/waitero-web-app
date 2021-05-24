import { combineReducers } from 'redux';
import omit from 'lodash/omit';
import union from 'lodash/union';

import * as types from '../types/restaurants';


const byId = (state = {}, action) => {
    switch(action.type) {
        case types.FETCH_RESTAURANTS_COMPLETED: {
            const { entities, order } = action.payload;
            const newState = { ...state };

            order.forEach( id => {
                newState[id] = {
                    ...entities[id]
                };
            });

            return newState;
        };

        case types.ADD_RESTAURANT_STARTED: {
            const newState = { ...state };

            newState[action.payload.restaurant.id] = {
                ...action.payload.restaurant
            };

            return newState;
        };

        case types.REMOVE_RESTAURANT_COMPLETED: {
            return omit(state, action.payload.id);
        };

        default: {
            return state;
        };
    };
};

const order = (state = [], action) => {
    switch(action.type) {
        case types.FETCH_RESTAURANTS_COMPLETED: {
            return union(action.payload.order);
        };

        case types.ADD_RESTAURANT_STARTED: {
            return [ ...state, action.payload.restaurant.id];
        };

        case types.REMOVE_RESTAURANT_COMPLETED: {
            return state.filter( id => id !== action.payload.id);
        };

        default: {
            return state;
        };
    };
};

const selected = (state = null, action) => {
    switch(action.type) {
        case types.SELECT_RESTAURANT: {
            return action.payload.restaurant;
        };

        case types.DESELECT_RESTAURANT: {
            return null;
        };

        default: {
            return state;
        };
    };
};

const isFetching = (state = false, action) => {
    switch(action.type) {
        case types.FETCH_RESTAURANTS_STARTED: {
            return true;
        };

        case types.FETCH_RESTAURANTS_COMPLETED: {
            return false;
        };

        case types.FETCH_RESTAURANTS_FAILED: {
            return false;
        };

        case types.FETCH_RESTAURANT_STARTED: {
            return true;
        };

        case types.FETCH_RESTAURANT_COMPLETED: {
            return false;
        };

        case types.FETCH_RESTAURANT_FAILED: {
            return false;
        };

        default: {
            return state;
        };
    };
};

const isAdding = (state = false, action) => {
    switch(action.type) {
        case types.ADD_RESTAURANT_STARTED: {
            return true;
        };

        case types.ADD_RESTAURANT_COMPLETED: {
            return false;
        };

        case types.ADD_RESTAURANT_FAILED: {
            return false;
        };

        default : {
            return state;
        };
    };
};

const isRemoving = (state = false, action) => {
    switch(action.type) {
        case types.REMOVE_RESTAURANT_STARTED: {
            return true;
        };

        case types.REMOVE_RESTAURANT_COMPLETED: {
            return false;
        };

        case types.REMOVE_RESTAURANT_FAILED: {
            return false;
        };

        default : {
            return state;
        };
    };
};

const error = (state = null, action) => {
    switch(action.type) {
        case types.FETCH_RESTAURANTS_STARTED: {
            return null;
        };

        case types.FETCH_RESTAURANTS_COMPLETED: {
            return null;
        };

        case types.FETCH_RESTAURANTS_FAILED: {
            return action.payload.error;
        };

        case types.FETCH_RESTAURANT_STARTED: {
            return null;
        };

        case types.FETCH_RESTAURANT_COMPLETED: {
            return null;
        };

        case types.FETCH_RESTAURANT_FAILED: {
            return action.payload.error;
        };

        case types.ADD_RESTAURANT_STARTED: {
            return null;
        };

        case types.ADD_RESTAURANT_COMPLETED: {
            return null;
        };

        case types.ADD_RESTAURANT_FAILED: {
            return action.payload.error;
        };

        case types.REMOVE_RESTAURANT_STARTED: {
            return null;
        };

        case types.REMOVE_RESTAURANT_COMPLETED: {
            return null;
        };

        case types.REMOVE_RESTAURANT_FAILED: {
            return action.payload.error;
        };

        default: {
            return state;
        };
    };
};

const restaurants = combineReducers({
    byId,
    order,
    selected,
    isFetching,
    isAdding,
    isRemoving,
    error
});

export default restaurants;

export const getRestaurant = (state, id) => state.byId[id];
export const getRestaurants = state => state.order.map(id => getRestaurant(state, id));
export const getSelectedRestaurant = state => state.selected;
export const getIsFetchingRestaurant = state => state.isFetching;
export const getIsAddingRestaurant = state => state.isAdding;
export const getIsRemovingRestaurant = state => state.isRemoving;
export const getRestaurantsError = state => state.error;