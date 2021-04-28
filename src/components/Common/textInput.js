/* -------------------------------------------------------------------------- */
/*                            Componente TextInput                            */
/* -------------------------------------------------------------------------- */
// Este componente contiene un textinput genérico que se utiliza en muchas pantallas de la aplicación.

import React from 'react';


export default function TextInput(props) {
  const { input, meta: { touched, error } , hasPlaceholder = true, ...inputProps } = props;
  return (!hasPlaceholder ? 
    <div className="pt-5">
      <label className="block text-md font-medium text-gray-700">{inputProps.label}</label>
      <input {...input} autoComplete={inputProps.autoCompleteInput} type={inputProps.type}
      className={"appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"} 
      />
      {touched && error && <p className={"text-red-600 text-sm mt-0 mb-3"}>{error}</p>}
    </div> :
    <div>
      <input {...input} autoComplete={inputProps.autoCompleteInput} placeholder={inputProps.label} type={inputProps.type}
      className={"appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm"} 
      />
      {touched && error && <p className={"text-red-600 text-sm mt-0 mb-3"}>{error}</p>}
    </div>
  );
}