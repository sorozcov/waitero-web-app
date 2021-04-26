import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Redirect } from 'react-router';
import { createHashHistory } from 'history';
import { configureStore } from '../../store';


import * as selectors from '../../logic/reducers';
import * as actions from '../../logic/actions/auth';
import Restaurants from '../Restaurants';
import RestaurantDetails from '../Restaurants/RestaurantDetails';
import LoginScreen from '../Login';
import HomeScreensSuperAdmin from '../HomeScreenSuperAdmin';
import Products from "../Products";
import NewProductForm from "../NewProductForm";
import TokenRefresh from '../TokenRefresh';
import Menus from "../Menus";

const { store } = configureStore();


export const  history = createHashHistory();
const  App = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	function getPersistedStorage() {
		try {
			const token = localStorage.getItem('auth');
		  	if(!selectors.isAuthenticated(store.getState()) && token !== null){
			    store.dispatch(actions.completeLogin(token));
				setIsAuthenticated(true);
		  	}
		} catch (error) {
		 	console.log(error);
		}
	}

	useEffect(getPersistedStorage,[]);

   	return(
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
						<Route exact path = '/restaurants' component = { Restaurants } />
						<Route exact path = '/restaurants/:restaurantId' component = { RestaurantDetails } />
						<Route path='/home_screen_super_admin' component = { HomeScreensSuperAdmin } />
						<Route path='/products' component = { Products } />
						<Route path='/add_product' component = { NewProductForm } />
						<Route path='/menus' component={Menus}/>
				</Router>
				{/* Actualiza el token solo si esta autenticado */}
				<TokenRefresh reviewTime={10000} />
			</Provider>

		</>
	);
}

export default App;