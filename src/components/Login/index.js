import logo from '../../assets/waitero.svg';
import './index.css';


function LoginPage() {
  return (
    
    <div >
      <header className="background">
      
  
      <div className="flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 rounded-md">
  <div className="max-w-md w-full space-y-8">
   
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
      <form className="mt-8 space-y-6" action="#" method="POST">
      <input type="hidden" name="remember" value="true"/>
      <div className="rounded-md shadow-sm -space-y-px">
        <div>
          <label htmlFor="email-address" className="sr-only">Usuario</label>
          <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm" placeholder="Usuario"/>
        </div>
        <div>
          <label htmlFor="password" className="sr-only">Contraseña</label>
          <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm" placeholder="Contraseña"/>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm">
          <a href="#" className="font-small text-primary-600 hover:text-primary-500">
            Si olvidaste tu contraseña, haz click aquí.
          </a>
        </div>
      </div>
      <div>
        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
         
          Iniciar Sesión
        </button>
      </div>
      </form>
      </div>
      </div>
      
      
      </header>
    </div>
  );
}

export default LoginPage;