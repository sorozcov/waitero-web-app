import * as types from '../types/menus';

export const startFetchingMenu = () => ({
    type: types.MENU_FETCH_STARTED,
});
export const completeFetchingMenu = (entities, order) => ({
    type: types.MENU_FETCH_COMPLETED,
    payload: {
        entities,
        order,
    },
});
export const failFetchingMenu = error => ({
    type: types.MENU_FETCH_FAILED,
    payload: {
        error,
    },
});

export const startAddingMenu = menu => ({
    type: types.MENU_ADD_STARTED,
    payload: menu,
});
export const completeAddingMenu = menu => ({
    type: types.MENU_ADD_COMPLETED,
    payload: menu,
});
export const failAddingMenu = (oldId, error) => ({
    type: types.MENU_ADD_FAILED,
    payload: {
        oldId,
        error,
    },
});

export const startEditingMenu = user => ({
    type: types.MENU_EDIT_STARTED,
    payload: user,
});
export const completeEditingMenu = user => ({
    type: types.MENU_EDIT_COMPLETED,
    payload: user,
});
export const failEditingMenu = (id, error) => ({
    type: types.MENU_EDIT_FAILED,
    payload: {
        id,
        error,
    },
});

export const selectMenu = (id) => ({
    type: types.MENU_SELECTED,
    payload: {
        id
    }
});

export const deselectMenu = () => ({
    type: types.MENU_DESELECTED
});

export const showMenuItems = (id) => ({
    type: types.MENU_SHOW_ITEMS,
    payload: {
        id
    }
})

export const hideMenuItems = (id) => ({
    type: types.MENU_HIDE_ITEMS,
    payload: {
        id
    }
})