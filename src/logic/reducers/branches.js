/* eslint-disable no-lone-blocks */
import { combineReducers } from 'redux';
import omit from 'lodash/omit';
import union from 'lodash/union';

import * as types from '../types/branches';


const byId = (state = {}, action) => {
    switch(action.type) {
        case types.FETCH_BRANCHES_COMPLETED: {
            const { entities, order } = action.payload;
            const newState = { ...state };

            order.forEach( id => {
                newState[id] = {
                    ...entities[id]
                };
            });

            return newState;
        };

        case types.ADD_BRANCH_STARTED: {
            const newState = { ...state };

            newState[action.payload.branch.id] = {
                ...action.payload.branch
            };

            return newState;
        };

        case types.REMOVE_BRANCH_COMPLETED: {
            return omit(state, action.payload.id);
        };

        default: {
            return state;
        };
    };
};

const order = (state = [], action) => {
    switch(action.type) {
        case types.FETCH_BRANCHES_COMPLETED: {
            return union(action.payload.order);
        };

        case types.ADD_BRANCH_STARTED: {
            return [ ...state, action.payload.branch.id];
        };

        case types.REMOVE_BRANCH_COMPLETED: {
            return state.filter( id => id !== action.payload.id);
        };

        default: {
            return state;
        };
    };
};

const selected = (state = null, action) => {
    switch(action.type) {
        case types.SELECT_BRANCH: {
            return action.payload.branch;
        };

        case types.DESELECT_BRANCH: {
            return null;
        };

        default: {
            return state;
        };
    };
};

const isFetching = (state = false, action) => {
    switch(action.type) {
        case types.FETCH_BRANCHES_STARTED: {
            return true;
        };

        case types.FETCH_BRANCHES_COMPLETED: {
            return false;
        };

        case types.FETCH_BRANCHES_FAILED: {
            return false;
        };

        case types.FETCH_BRANCH_STARTED: {
            return true;
        };

        case types.FETCH_BRANCH_COMPLETED: {
            return false;
        };

        case types.FETCH_BRANCH_FAILED: {
            return false;
        };

        default: {
            return state;
        };
    };
};

const isAdding = (state = false, action) => {
    switch(action.type) {
        case types.ADD_BRANCH_STARTED: {
            return true;
        };

        case types.ADD_BRANCH_COMPLETED: {
            return false;
        };

        case types.ADD_BRANCH_FAILED: {
            return false;
        };

        default : {
            return state;
        };
    };
};

const isRemoving = (state = false, action) => {
    switch(action.type) {
        case types.REMOVE_BRANCH_STARTED: {
            return true;
        };

        case types.REMOVE_BRANCH_COMPLETED: {
            return false;
        };

        case types.REMOVE_BRANCH_FAILED: {
            return false;
        };

        default : {
            return state;
        };
    };
};

const error = (state = null, action) => {
    switch(action.type) {
        case types.FETCH_BRANCHES_STARTED: {
            return null;
        };

        case types.FETCH_BRANCHES_COMPLETED: {
            return null;
        };

        case types.FETCH_BRANCHES_FAILED: {
            return action.payload.error;
        };

        case types.FETCH_BRANCH_STARTED: {
            return null;
        };

        case types.FETCH_BRANCH_COMPLETED: {
            return null;
        };

        case types.FETCH_BRANCH_FAILED: {
            return action.payload.error;
        };

        case types.ADD_BRANCH_STARTED: {
            return null;
        };

        case types.ADD_BRANCH_COMPLETED: {
            return null;
        };

        case types.ADD_BRANCH_FAILED: {
            return action.payload.error;
        };

        case types.REMOVE_BRANCH_STARTED: {
            return null;
        };

        case types.REMOVE_BRANCH_COMPLETED: {
            return null;
        };

        case types.REMOVE_BRANCH_FAILED: {
            return action.payload.error;
        };

        default: {
            return state;
        };
    };
};

const branches = combineReducers({
    byId,
    order,
    selected,
    isFetching,
    isAdding,
    isRemoving,
    error
});

export default branches;

export const getBranch = (state, id) => state.byId[id];
export const getBranches = state => state.order.map(id => getBranch(state, id));
export const getSelectedBranch = state => state.selected;
export const getIsFetchingBranch = state => state.isFetching;
export const getIsAddingBranch = state => state.isAdding;
export const getIsRemovingBranch = state => state.isRemoving;
export const getBranchesError = state => state.error;