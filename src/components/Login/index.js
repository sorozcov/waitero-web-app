import React, { useEffect } from 'react';
import logo from '../../assets/waitero.svg';
import './index.css';
import { history } from '../App/App.js';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';


import TextInput from '../Common/textInput'
import * as selectors from '../../logic/reducers';
import * as actionsAuth from '../../logic/actions/auth';

function LoginScreen( { handleSubmit,startLogin, isLoading, isAuthenticated, user }) {
  useEffect(() => {
    if(isAuthenticated && user)
      history.replace("/home_screen_super_admin");
  },[isAuthenticated, user]);
  return (
    
    <div >
      {/* <div className="absolute w-full flex justify-center" role="alert">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 w-11/12 rounded relative">
          <strong className="font-bold">Error al iniciar sesión </strong>
          <span className="block sm:inline">Revisa que los datos que ingresaste sean correctos.</span>
          <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
          </span>
        </div>
      </div>  */}
      <header className="background">
        <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 rounded-md w-2/6">
          <div className="max-w-full w-full space-y-8">
            <img className="mx-auto h-28 w-auto" src={logo} alt="Workflow"></img>
            <div className="text-left text-1xl font-bold text-gray-900" style={{marginTop:'0px',marginBottom:'0px'}}>
              Inicio de Sesión
            </div>
            <hr style={{
                    backgroundColor: '#0FCBFA',
                    height: 2,
                    marginTop:'0px'
                }}/>
            <form onSubmit={handleSubmit(startLogin)} className="mt-8 space-y-6" >
              <input type="hidden" name="remember" value="true"/>
              <div className="rounded-md shadow-sm -space-y-px">
                <Field name={'username'} component={TextInput} label={'Usuario'} type={"text"} />
                <Field name={'password'} component={TextInput} label={'Contraseña'} type={"password"} />
              </div>
              <div className="flex items-center " style={{marginTop:'15px'}}>
                <div className="text-sm">
                  <a href="http://localhost:3000/login" className="font-small text-secondary hover:text-secondary">
                    Si olvidaste tu contraseña, haz click aquí.
                  </a>
                </div>
              </div>
              <div>
                <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary">
                  Iniciar Sesión
                  <span className="flex items-center pl-1">  
                  <svg className="h-5 w-5 text-secondary group-hover:text-primary"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                  </svg>
                </span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </header>
    </div>
  );
}

export default connect(
  state => ({
    isLoading: selectors.getIsAuthenticating(state),
    user: selectors.getAuthUserInformation(state),
    isAuthenticated: selectors.isAuthenticated(state),
  }),
  dispatch => ({
    startLogin(values) {
      dispatch(actionsAuth.startLogin(values));
    },
  }),
)(reduxForm({ 
  form: 'login',
  enableReinitialize : true,
  validate: (values) => {
    const errors = {};

    errors.username = !values.username
      ? 'Este campo es obligatorio'
      : undefined;
      errors.password = !values.password
        ? 'Este campo es obligatorio'
        : undefined;
    return errors;
  }
})(LoginScreen));