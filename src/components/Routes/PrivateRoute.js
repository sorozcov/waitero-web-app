import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

import * as selectors from '../../logic/reducers';

function PrivateRoute({ isAuthenticated, component: Component, ...rest }) {
  return(
  <Route {...rest} component={(props) => (
    !isAuthenticated ? <Redirect to="/login" /> : <Component {...props} /> 
  )} />
)};


export default connect(
	state => ({
	  isAuthenticated: selectors.isAuthenticated(state),   
	}),
	undefined,
  )(PrivateRoute);