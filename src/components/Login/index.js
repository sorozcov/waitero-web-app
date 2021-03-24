import logo from '../../assets/waitero.svg';
import './index.css';
import { withRouter } from "react-router-dom";
import { history } from '../App/App.js';

function LoginScreen() {
  return (
    
    <div >
      <header className="background">
      
  
      <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 rounded-md w-2/6">
  <div className="max-w-full w-full space-y-8">
   
      <img className="mx-auto h-28 w-auto" src={logo} alt="Workflow"></img>
    
      <div className="text-left text-1xl font-bold text-gray-900" style={{marginTop:'0px',marginBottom:'0px'}}>
        Inicio de Sesión
      </div>
      <hr
          
          style={{
              backgroundColor: '#0FCBFA',
              height: 2,
              marginTop:'0px'
          }}
      />
      <form className="mt-8 space-y-6" >
      <input type="hidden" name="remember" value="true"/>
      
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
       
          <label htmlFor="email-address" className="sr-only"> Usuario</label>
          
          <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm" placeholder="Usuario"/>
        </div>
        <div>
          
          <label htmlFor="password" className="sr-only">Contraseña</label>
          <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm" placeholder="Contraseña"/>
        </div>
      </div>

      <div className="flex items-center " style={{marginTop:'15px'}}>
        <div className="text-sm">
          <a href="http://localhost:3000/login" className="font-small text-secondary hover:text-secondary">
            Si olvidaste tu contraseña, haz click aquí.
          </a>
        </div>
      </div>
      <div>
        <button type="submit" onClick={()=>{history.push("/home_screen_super_admin")}} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary">
        
          Iniciar Sesión
          <span className="flex items-center pl-1">  
          <svg className="h-5 w-5 text-secondary group-hover:text-primary" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
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

export default LoginScreen;