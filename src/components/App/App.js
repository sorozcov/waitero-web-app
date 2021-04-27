import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Redirect } from 'react-router';
import { createHashHistory } from 'history';
import { configureStore } from '../../store';


import * as selectors from '../../logic/reducers';
import * as actions from '../../logic/actions/auth';
import Restaurants from '../Restaurants';
import Users from '../UsersList';
import RestaurantDetails from '../Restaurants/RestaurantDetails';
import LoginScreen from '../Login';
import HomeScreensSuperAdmin from '../HomeScreenSuperAdmin';
import Products from "../Products";
import NewProductForm from "../NewProductForm";
import TokenRefresh from '../TokenRefresh';
import PrivateRoute from '../Routes/PrivateRoute';
import Menus from "../Menus";

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
						let initialPage ='/login';
						if(isAuthenticated){
							initialPage ='/home_screen_super_admin';
						}
						return(
						<Redirect to={initialPage}/>
					)}}/>

						<Route  exact path='/login' component = { LoginScreen } />

						{/* Solo si esta autenticado podrá acceder a las siguientes partes de la aplicación */}
						<PrivateRoute exact path = '/restaurants' component = { Restaurants } route={2} />
						<PrivateRoute exact path = '/restaurants/:restaurantId' component = { RestaurantDetails } route={2} />
						<PrivateRoute exact path='/home_screen_super_admin' component = { HomeScreensSuperAdmin } route={1} />
						<PrivateRoute exact path = '/users' component = { Users } route={3} />
						<PrivateRoute exact path='/products' component = { Products } />
						<PrivateRoute exact path='/add_product' component = { NewProductForm } />
						<PrivateRoute exact path='/menus' component={Menus}/>
				</Router>
				{/* Actualiza el token solo si esta autenticado */}
				<TokenRefresh reviewTime={10000} />
			</Provider>

		</>
	);
}

export default App;