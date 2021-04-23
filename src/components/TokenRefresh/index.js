/* -------------------------------------------------------------------------- */
/*                           Componente RefreshToken                          */
/* -------------------------------------------------------------------------- */
// Este componente es un componente vacio que actualiza el token del usuario en sesión.

import { useEffect } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../logic/actions/auth';
import * as selectors from '../../logic/reducers';


var interval = null;

const TokenRefresh = ({ onRefresh, reviewTime = 10000, isAuthenticated }) => {
  useEffect(
    () => {
      if(isAuthenticated)
        interval = setInterval(onRefresh, reviewTime);
      else 
        clearInterval(interval);
    },[isAuthenticated]);
  return null;
};


export default connect(
  state => ({
    isAuthenticated: selectors.isAuthenticated(state),   
  }),
  dispatch => ({
    onRefresh() {
      console.log('Refresh')
      dispatch(actions.startTokenRefresh());
    },
  }),
)(TokenRefresh);