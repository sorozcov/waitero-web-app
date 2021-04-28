import { Provider } from 'react-redux';
import { createHashHistory } from 'history';
import { configureStore } from '../../store';
import React, { useState, useEffect } from 'react';
import { Router, Route, Redirect } from 'react-router';

import Users from '../Users';
import Offers from '../Offers';
import LoginScreen from '../Login';
import Restaurants from '../Restaurants';
import TokenRefresh from '../TokenRefresh';
import PrivateRoute from '../Routes/PrivateRoute';
import HomeScreensSuperAdmin from '../HomeScreenSuperAdmin';
import RestaurantDetails from '../Restaurants/RestaurantDetails';

import * as selectors from '../../logic/reducers';
import * as actions from '../../logic/actions/auth';

const { store } = configureStore();


export const  history = createHashHistory();
const  App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(null);
	function getPersistedStorage() {
		try {
			const token = localStorage.getItem('auth');
		  	if(!selectors.isAuthenticated(store.getState()) && token !== null){
			    store.dispatch(actions.completeLogin(token));
			    store.dispatch(actions.authenticationUserInformationStarted());
				setIsAuthenticated(true);
		  	} else {
				setIsAuthenticated(false);
			} 
		} catch (error) {
		 	console.log(error);
		}
	}

	useEffect(getPersistedStorage,[]);

   	return(
		isAuthenticated != null &&
		<>
			<Provider store={store}>
				<Router history={history} >
					<Route exact path="/" render={() => { 
						var initialPage ='/login';
						if(isAuthenticated)
							initialPage ='/home_screen_super_admin';						
						return(
						
						<Redirect to={initialPage}/>
					)}}/>
					
						<Route  exact path='/login' component = { LoginScreen } />

						{/* Solo si esta autenticado podrá acceder a las siguientes partes de la aplicación */}
						<PrivateRoute exact path = '/restaurants' component = { Restaurants } route={2} />
						<PrivateRoute exact path = '/restaurants/:restaurantId' component = { RestaurantDetails } route={2} />				
						<PrivateRoute exact path='/home_screen_super_admin' component = { HomeScreensSuperAdmin } route={1} />
						<PrivateRoute exact path = '/users' component = { Users } route={3} />
						<PrivateRoute exact path = '/clients' component = { Offers } route={4} />
				</Router>
				{/* Actualiza el token solo si esta autenticado */}
				<TokenRefresh reviewTime={10000} />
			</Provider>
			
		</>
	);
}

export default App;