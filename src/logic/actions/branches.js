import * as types from '../types/branches';

// 
export const startFetchingBranches = restaurantId => ({
    type: types.FETCH_BRANCHES_STARTED,
    payload: {
        restaurantId
    }
});

export const completeFetchingBranches = (entities, order) => ({
    type: types.FETCH_BRANCHES_COMPLETED,
    payload: {
        entities,
        order
    }
});

export const failFetchingBranches = error => ({
    type: types.FETCH_BRANCHES_FAILED,
    payload: {
        error
    }
});

//
export const startFetchingBranch = id => ({
    type: types.FETCH_BRANCH_STARTED,
    payload: {
        id
    }
});

export const completeFetchingBranch = branch => ({
    type: types.FETCH_BRANCH_COMPLETED,
    payload: {
        branch
    }
});

export const failFetchingBranch = error => ({
    type: types.FETCH_BRANCH_FAILED,
    payload: {
        error
    }
});

//
export const startAddingBranch = branch => ({
    type: types.ADD_BRANCH_STARTED,
    payload: {
        branch
    }
});

export const completeAddingBranch = branch => ({
    type: types.ADD_BRANCH_COMPLETED,
    payload: {
        branch
    }
});

export const failAddingBranch = error => ({
    type: types.ADD_BRANCH_FAILED,
    payload: {
        error
    }
});

//
export const startRemovingBranch = id => ({
    type: types.REMOVE_BRANCH_STARTED,
    payload: {
        id
    }
});

export const completeRemovingBranch = id => ({
    type: types.REMOVE_BRANCH_COMPLETED,
    payload: {
        id
    }
});

export const failRemovingBranch = (id, error) => ({
    type: types.REMOVE_BRANCH_FAILED,
    payload: {
        id,
        error
    }
});

//
export const selectingBranch = branch => ({
    type: types.SELECT_BRANCH,
    payload: {
        branch
    }
});

export const deselectingBranch = () => ({
    type: types.DESELECT_BRANCH
});