import { combineReducers } from 'redux';
import { reducer as formReducer, resetSection } from 'redux-form'

import auth, * as authSelectors from './auth';
import users, * as usersSelectors from './users';
import { AUTHENTICATION_IDENTITY_CLEARED } from '../types/auth';
import products, * as productsSelectors from "./products";
import menus, * as menusSelectors from './menus'
import restaurants , * as restauranstSelectors from './restaurants';
import branches, * as branchesSelectors from './branches';

const reducer = combineReducers({
  auth,
  users,
  form: formReducer,
  products,
  menus,
  restaurants,
  branches
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

//Users
export const getUser = (state, id) => usersSelectors.getUser(state.users, id);
export const getUsers = state => usersSelectors.getUsers(state.users);
export const getSelectedUser = state => usersSelectors.getSelectedUser(state.users);
export const isFetchingUsers = state => usersSelectors.isFetchingUsers(state.users);
export const isAddingUsers = state => usersSelectors.isAddingUsers(state.users);
export const isEditingUsers = state => usersSelectors.isEditingUsers(state.users);
export const isRemovingUsers = state => usersSelectors.isRemovingUsers(state.users);
export const getUsersError = state => usersSelectors.getUsersError(state.users);
export const getAddStatus = state => usersSelectors.getAddStatus(state.users);

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

//  RESTAURANTS
export const getRestaurant = (state, id) => restauranstSelectors.getRestaurant(state.restaurants, id);
export const getRestaurants = state => restauranstSelectors.getRestaurants(state.restaurants);
export const getSelectedRestaurant = state => restauranstSelectors.getSelectedRestaurant(state.restaurants);
export const getIsFetchingRestaurant = state => restauranstSelectors.getIsFetchingRestaurant(state.restaurants);
export const getIsAddingRestaurant = state => restauranstSelectors.getIsAddingRestaurant(state.restaurants);
export const getIsRemovingRestaurant = state => restauranstSelectors.getIsRemovingRestaurant(state.restaurants);
export const getRestaurantsError = state => restauranstSelectors.getRestaurantsError(state.restaurants);

// BRANCHES
export const getBranch = (state, id) => branchesSelectors.getBranch(state.branches, id);
export const getBranches = state => branchesSelectors.getBranches(state.branches);
export const getSelectedBranch = state => branchesSelectors.getSelectedBranch(state.branches);
export const getIsFetchingBranch = state => branchesSelectors.getIsFetchingBranch(state.branches);
export const getIsAddingBranch = state => branchesSelectors.getIsAddingBranch(state.branches);
export const getIsRemovingBranch = state => branchesSelectors.getIsRemovingBranch(state.branches);
export const getBranchesError = state => branchesSelectors.getBranchesError(state.branches);