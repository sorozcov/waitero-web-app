import * as types from '../types/restaurants';

//
export const startFetchingRestaurants = () => ({
    type: types.FETCH_RESTAURANTS_STARTED
});

export const completeFetchingRestaurants = (entities, order) => ({
    type: types.FETCH_RESTAURANTS_COMPLETED,
    payload: {
        entities,
        order
    }
});

export const failFetchingRestaurants = error => ({
    type: types.FETCH_RESTAURANTS_FAILED,
    payload: {
        error
    }
});

//
export const startFetchingRestaurant = id => ({
    type: types.FETCH_RESTAURANT_STARTED,
    payload: {
        id
    }
});

export const completeFetchingRestaurant = restaurant => ({
    type: types.FETCH_RESTAURANT_COMPLETED,
    payload: {
        restaurant
    }
});

export const failFetchingRestaurant = error => ({
    type: types.FETCH_RESTAURANT_FAILED,
    payload: {
        error
    }
});

//
export const startAddingRestaurant = restaurant => ({
    type: types.ADD_RESTAURANT_STARTED,
    payload: {
        restaurant
    }
});

export const completeAddingRestaurant = restaurant => ({
    type: types.ADD_RESTAURANT_COMPLETED,
    payload: {
        restaurant
    }
});

export const failAddingRestaurant = error => ({
    type: types.ADD_RESTAURANT_FAILED,
    payload: {
        error
    }
});

//
export const startRemovingRestaurant = id => ({
    type: types.REMOVE_RESTAURANT_STARTED,
    payload: {
        id
    }
});

export const completeRemovingRestaurant = id => ({
    type: types.REMOVE_RESTAURANT_COMPLETED,
    payload: {
        id
    }
});

export const failRemovingRestaurant = (id, error) => ({
    type: types.REMOVE_RESTAURANT_FAILED,
    payload: {
        id,
        error
    }
});

//
export const selectingRestaurant = restaurant => ({
    type: types.SELECT_RESTAURANT,
    payload: {
        restaurant
    }
});

export const deselectingRestaurant = () => ({
    type: types.DESELECT_RESTAURANT
});