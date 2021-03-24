import { Provider } from 'react-redux';
import { Router, Route, Redirect } from 'react-router';
import { createHashHistory } from 'history';
import { configureStore } from '../../store';


import LoginScreen from '../Login';
import HomeScreensSuperAdmin from '../HomeScreenSuperAdmin';

const { store } = configureStore();


export const  history = createHashHistory();
const  App = () => {
   return(
		<Provider store={store}>
			<Router history={history} >
				<Route exact path="/" render={() => { 
					// const initialPage = ((selectors.isLoggedUser(store.getState())) 
					//   ? (selectors.getLoggedUser(store.getState()).roleid===1) ? '/admin/usuarios' : '/main/canciones'  
					//   : '/login');
					const initialPage ='/login';
					return(
					
					<Redirect to={initialPage}/>
				)}}/>

					<Route  exact path='/login'>
					<LoginScreen />
					</Route>
					<Route   path='/home_screen_super_admin'>
					<HomeScreensSuperAdmin />
					</Route>
					{/* <Route path='/signin'>
					<Signin />
					</Route> */}
					{/* <Route path='/main'
					render={() => { 
					const page = ((selectors.isLoggedUser(store.getState())) 
						?  '/main' 
						: '/login' );
					return(
					<Redirect to={page}/>
					)}} > 
					<Sidebar />
					<PrivateRoute path={'/main/canciones'}  component={<Tracks />} store={store}/>
					<PrivateRoute path={'/main/artistas'}  component={<Artists />} store={store}/>
					<PrivateRoute path={'/main/álbumes'}  component={<Albums />} store={store}/>
					<PrivateRoute path={'/main/reportes'}  component={<Reports />} store={store}/>
					</Route> */}
					{/* <Route path='/editar'
					render={() => { 
					const page = ((selectors.isLoggedUser(store.getState())) 
						? '/editar' 
						: '/login');
					return(
					<Redirect to={page}/>
					)}} > 
					<PrivateRoute path={'/editar/canción'}  component={<EditTrack />} store={store}/>
					<PrivateRoute path={'/editar/artista'}  component={<EditArtist />} store={store}/>
					<PrivateRoute path={'/editar/álbum'}  component={<EditAlbum />} store={store}/>
					<PrivateRouteAdmin path={'/editar/usuario'}  component={<EditUser />} store={store}/>
					<PrivateRouteAdmin path={'/editar/rol'}  component={<EditRole />} store={store}/>
					<PrivateRouteAdmin path={'/editar/permisos'}  component={<AssignPermission />} store={store}/>
					
					</Route> */}
					
					{/* <Route path='/admin'
					render={() => { 
					const page = ((selectors.isLoggedUser(store.getState())) 
						? '/admin'  
						: '/login');
					return(
					<Redirect to={page}/> */}
					{/* )}} > 
					<SidebarAdmin />
					<PrivateRouteAdmin path={'/admin/usuarios'}  component={<Users />} store={store}/>
					<PrivateRouteAdmin path={'/admin/roles'}  component={<Roles />} store={store}/>
					<PrivateRouteAdmin path={'/admin/simulación'}  component={<Simulation />} store={store}/>
					<PrivateRouteAdmin path={'/admin/bitácora'}  component={<LogBook />} store={store}/> */}
					{/* </Route> */}
			</Router>
		</Provider>
	);
}

export default App;