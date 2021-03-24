import { Provider } from 'react-redux';
import { Router, Route, Redirect } from 'react-router';
import { createHashHistory } from 'history';
import { configureStore } from '../../store';


import LoginPage from '../Login';
import Restaurants from '../Restaurants';
import RestaurantDetails from '../Restaurants/RestaurantDetails';

const { store } = configureStore();


export const  history = createHashHistory();
const  App = () => {
   return(
		<Provider store={store}>
			<Router history={history} >
				<Route exact path="/" render={() => { 
					const initialPage ='/login';
					return(
					
					<Redirect to={initialPage}/>
				)}}/>
				
				<Route  exact path='/login'>
					<LoginPage />
				</Route>

				<Route exact path = '/restaurants' component = { Restaurants } />
				<Route exact path = '/restaurants/:restaurantId' component = { RestaurantDetails } />
			</Router>
		</Provider>
	);
}

export default App;