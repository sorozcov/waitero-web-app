import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import auth, * as authSelectors from './auth';
import { AUTHENTICATION_IDENTITY_CLEARED } from '../types/auth';
import products, * as productsSelectors from "./products";
import menus, * as menusSelectors from './menus'

const reducer = combineReducers({
  auth,
  form: formReducer,
  products,
  menus
});

const rootReducer = (state, action) => {
  if (action.type === AUTHENTICATION_IDENTITY_CLEARED) {
    state = undefined
  }
  return reducer(state, action)
}

export default rootReducer;

//Authorization Selectors
export const getAuthToken = state => authSelectors.getAuthToken(state.auth);
export const getIsAuthenticating = state => authSelectors.getIsAuthenticating(state.auth);
export const getAuthenticatingError = state => authSelectors.getAuthenticatingError(state.auth);
export const isAuthenticated = state => getAuthToken(state) != null;
export const getAuthUserID = state => authSelectors.getAuthUserID(state.auth);
export const getAuthExpiration = state => authSelectors.getAuthExpiration(state.auth);
export const getAuthUsername = state => authSelectors.getAuthUsername(state.auth);
export const getAuthUser = state => authSelectors.getAuthUser(state.auth);
export const getAuthUserInformation = state => authSelectors.getAuthUserInformation(state.auth);
export const getIsRefreshingToken = state => authSelectors.getIsRefreshingToken(state.auth);
export const getRefreshingError = state => authSelectors.getRefreshingError(state.auth);

export const getProductByID = (state, id) => productsSelectors.getProductByID(state.products, id);
export const getProductOrder = (state) => productsSelectors.getProductOrder(state.products);
export const getAllProducts = (state) => productsSelectors.getAllProducts(state.products);
export const getSelectedProduct = (state) => productsSelectors.getSelectedProduct(state.products);
export const getIsFetchingProducts = (state) => productsSelectors.getIsFetching(state.products);

export const getMenuByID = (state, id) => menusSelectors.getMenuByID(state.menus, id);
export const getMenuOrder = (state) => menusSelectors.getMenuOrder(state.menus);
export const getAllMenus = (state) => menusSelectors.getAllMenus(state.menus);
export const getSelectedMenu = (state) => menusSelectors.getSelectedMenu(state.menus);
export const getIsFetchingMenus = (state) => menusSelectors.getIsFetching(state.products);