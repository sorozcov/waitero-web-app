import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form'

import auth, * as authSelectors from './auth';
import users, * as usersSelectors from './users';
import offers, * as offerSelectors from './offers';
import { AUTHENTICATION_IDENTITY_CLEARED } from '../types/auth';

const reducer = combineReducers({
  auth,
  users,
  offers,
  form: formReducer,
});

const rootReducer = (state, action) => {
  if (action.type === AUTHENTICATION_IDENTITY_CLEARED) {
    state = undefined
  }
  return reducer(state, action)
}

export default rootReducer;


//Authorization
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

//Offers
export const getOffer = (state, id) => offerSelectors.getOffer(state.offers, id);
export const getOffers = state => offerSelectors.getOffers(state.offers);
export const isFetchingOffers = state => offerSelectors.isFetchingOffers(state.offers);
export const isAddingOffers = state => offerSelectors.isAddingOffers(state.offers);
export const isEditingOffers = state => offerSelectors.isEditingOffers(state.offers);
export const isRemovingOffers = state => offerSelectors.isRemovingOffers(state.offers);
export const getOffersError = state => offerSelectors.getOffersError(state.offers);
export const getOfferAddStatus = state => offerSelectors.getAddStatus(state.offers);