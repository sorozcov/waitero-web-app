import {combineReducers} from 'redux'
import omit from 'lodash/omit';
import includes from 'lodash/includes'

import * as types from '../types/menus';


const byId = (state = {}, action) => {
    switch(action.type) {
        case types.MENU_FETCH_COMPLETED: {
            const { entities, order } = action.payload;
            const newState = { ...state };
            order.forEach(id => {
                newState[id] = {
                    ...entities[id],
                    showItems: false,
                    isConfirmed: true,
                };
            });

            return newState;
        }
        case types.MENU_ADD_COMPLETED: {
            const newState = { ...state };
            newState[action.payload.id] = {
                ...action.payload,
            };
            return newState;
        }
        case types.MENU_EDIT_COMPLETED: {
            const newState = { ...state };
            newState[action.payload.id] = {
                ...newState[action.payload.id],
                ...action.payload,
            };
            return newState;
        }
        case types.MENU_REMOVE_STARTED: {
            return omit(state, action.payload.id);
        }
        case types.MENU_SHOW_ITEMS:{
            return {
                ...state,
                [action.payload.id]:{
                    ...state[action.payload.id],
                    showItems: true
                }
            }
        }
        case types.MENU_HIDE_ITEMS:{
            return {
                ...state,
                [action.payload.id]:{
                    ...state[action.payload.id],
                    showItems: false
                }
            }
        }
        default: {
            return state;
        }
    }
};

const order = (state = [], action) => {
    switch(action.type) {
        case types.MENU_FETCH_COMPLETED: {
            return [...state, ...action.payload.order.filter(newElement => !includes(state, newElement))];
        }
        case types.MENU_ADD_COMPLETED: {
            return [...state, action.payload.id];
        }
        case types.MENU_REMOVE_STARTED: {
            return state.filter(id => id !== action.payload.id);
        }
        default: {
            return state;
        }
    }
};

const selected = (state = null, action) => {
    switch (action.type) {
        case types.MENU_SELECTED: {
            return action.payload.id
        }
        case types.MENU_DESELECTED: {
            return null
        }
        default:{
            return state
        }
    }
}

const isFetching = (state = false, action) => {
    switch(action.type) {
        case types.MENU_FETCH_STARTED: {
            return true;
        }
        case types.MENU_FETCH_COMPLETED: {
            return false;
        }
        case types.MENU_FETCH_FAILED: {
            return false;
        }
        default: {
            return state;
        }
    }
};

const isAdding = (state = false, action) => {
    switch (action.type) {
        case types.MENU_ADD_STARTED:
            {
                return true;
            }
        case types.MENU_ADD_COMPLETED:
            {
                return false;
            }
        case types.MENU_ADD_FAILED:
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
        case types.MENU_EDIT_STARTED:
            {
                return true;
            }
        case types.MENU_EDIT_COMPLETED:
        case types.MENU_EDIT_FAILED:
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
        case types.MENU_REMOVE_STARTED:
            {
                return true;
            }
        case types.MENU_REMOVE_COMPLETED:
            {
                return false;
            }
        case types.MENU_REMOVE_FAILED:
            {
                return false;
            }
        default:
            {
                return state;
            }
    }
};


const error = (state = null, action) => {
    switch(action.type) {
        case types.MENU_FETCH_FAILED: {
            return action.payload.error;
        }
        case types.MENU_FETCH_STARTED: {
            return null;
        }
        case types.MENU_FETCH_COMPLETED: {
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
    isAdding,
    isEditing,
    isRemoving,
    error,
});


export const getMenu = (state, id) => state.byId[id];
export const getMenus = state => state.order.map(id => getMenu(state, id));
export const getSelectedMenu = (state) => state.selected;
export const isFetchingMenus = state => state.isFetching;
export const isAddingMenus = state => state.isAdding;
export const isEditingMenus = state => state.isEditing;
export const isRemovingMenus = state => state.isRemoving;
export const getMenusError = state => state.error;
export const getAddStatus = state => state.addStatus;