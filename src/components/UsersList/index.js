import React, { Fragment, useEffect, useState } from 'react';
import { Listbox, Dialog, Transition } from '@headlessui/react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';

import './styles.css';
import TextInput from '../Common/textInput';
import * as selectors from '../../logic/reducers';
import * as actionsUsers from '../../logic/actions/users';

const userTypes = [
    {id:1, name:'Super Administrador'},
    {id:2, name:'Administrador de Restaurante'},
    {id:3, name:'Administrador de Sucursal'},
    {id:4, name:'Empleado de Sucursal'},
    {id:5, name:'Cliente'}
];

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
  

const Users = ({ users, fetchUsers, submitting, handleSubmit, createUser, editUser, initialValues, selectUser, deselectUser, isNew }) => {
    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState(userTypes[0]);
    useEffect(fetchUsers,[fetchUsers]);
    return (
        <Fragment>
            <header className="bg-white shadow pt-20">
                <div className="w-11/12 mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Usuarios
                </h1>
                </div>
            </header>
            <main>
                <div className="w-11/12 mx-auto py-6 sm:px-6 lg:px-8">
                
                    <div className="flex justify-end">
                        <button  onClick={() => deselectUser(setOpen)} className="bg-transparent hover:bg-blue-500 mb-5 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                        Nuevo Usuario
                        </button>
                    </div>
                    <div className="flex justify-center">
                        <div className="w-full">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Usuario
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Nombre Completo
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Tipo
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Número de teléfono
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {users.map(user => (
                                        <tr key={user.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                <div className="flex-shrink-0 h-10 w-10">
                                                    <img className="h-8 w-8 rounded-full" src={`https://ui-avatars.com/api/?name=${user== null ? '' : `${user.first_name}+${user.last_name}`}&background=7DDE92&color=023E8D`} alt="" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {user.username}
                                                    </div>
                                                    <div className="text-sm text-gray-500">
                                                        {user.email}
                                                    </div>
                                                </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {user.first_name} {user.last_name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {user.userType_display}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {user.phoneNumber}
                                            </td>
                                            <td  className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                

                                                <button
                                                    className="bg-gray-400 text-white active:bg-blue-600 hover:bg-blue-500 font-bold uppercase text-sm px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={()=> selectUser(user, setOpen)}
                                                >
                                                    Editar
                                                </button>
                                                {/* <button
                                                    className="bg-gray-400 text-white active:bg-red-600 hover:bg-red-500 font-bold uppercase text-sm px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={() => {}}
                                                >
                                                    Quitar
                                                </button> */}
                                            </td>
                                        </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" static className="fixed inset-0 overflow-hidden" open={open} onClose={setOpen}>
                    <div className="absolute inset-0 overflow-hidden">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-500"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-500"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>
                    <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
                        <Transition.Child
                        as={Fragment}
                        enter="transform transition ease-in-out duration-500 sm:duration-700"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transform transition ease-in-out duration-500 sm:duration-700"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                        >
                        <div className="relative w-screen max-w-xl">
                            <Transition.Child
                            as={Fragment}
                            enter="ease-in-out duration-500"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in-out duration-500"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                            >
                            <div className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                                <button
                                className="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                                onClick={() => setOpen(false)}
                                >
                                <span className="sr-only">Close panel</span>
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                </button>
                            </div>
                            </Transition.Child>
                            <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                            <div className="px-4 sm:px-6">
                                <Dialog.Title className="text-lg font-medium text-gray-900">{isNew ? 'Nuevo Usuario' : 'Editar Usuario'}</Dialog.Title>
                            </div>
                            <div className="mt-6 relative flex-1 px-4 sm:px-6">
                                <div className="rounded-md shadow-sm -space-y-px">
                                    <form>
                                        <Field name={'username'} component={TextInput} label={'Nombre de Usuario'} type={"text"} hasPlaceholder={false} />
                                        { isNew && <Field name={'password'} component={TextInput} label={'Contraseña'} type={"password"} hasPlaceholder={false} />}
                                        { isNew && <Listbox value={selected} onChange={setSelected}>
                                        {({ open }) => (
                                            <>
                                            <Listbox.Label className="pt-5 block text-md font-medium text-gray-700">Tipo de Usuario</Listbox.Label>
                                            <div className="mt-1 relative">
                                                <Listbox.Button className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-secondary focus:border-secondary focus:z-10 sm:text-sm">
                                                <span className="flex items-center">
                                                    {selected.name}
                                                </span>
                                                </Listbox.Button>

                                                <Transition
                                                show={open}
                                                as={Fragment}
                                                leave="transition ease-in duration-100"
                                                leaveFrom="opacity-100"
                                                leaveTo="opacity-0"
                                                >
                                                <Listbox.Options
                                                    static
                                                    className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                                                >
                                                    {userTypes.map((userType) => (
                                                    <Listbox.Option
                                                        key={userType.id}
                                                        className={({ active }) =>
                                                        classNames(
                                                            active ? 'text-white bg-primary' : 'text-gray-900',
                                                            'cursor-default select-none relative py-2 pl-3 pr-9'
                                                        )
                                                        }
                                                        value={userType}
                                                    >
                                                        {({ selected, active }) => (
                                                        <>
                                                            <div className="flex items-center">
                                                                <span
                                                                    className={classNames(selected ? 'font-semibold' : 'font-normal', 'ml-3 block truncate')}
                                                                >
                                                                    {userType.name}
                                                                </span>
                                                            </div>

                                                            {selected ? (
                                                            <span
                                                                className={classNames(
                                                                active ? 'text-white' : 'text-primary',
                                                                'absolute inset-y-0 right-0 flex items-center pr-4'
                                                                )}
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                                                </svg>
                                                            </span>
                                                            ) : null}
                                                        </>
                                                        )}
                                                    </Listbox.Option>
                                                    ))}
                                                </Listbox.Options>
                                                </Transition>
                                            </div>
                                            </>
                                        )}
                                        </Listbox>}
                                        <Field name={'first_name'} component={TextInput} label={'Nombre'} type={"text"} hasPlaceholder={false} />
                                        <Field name={'last_name'} component={TextInput} label={'Apellido'} type={"text"} hasPlaceholder={false} />
                                        <Field name={'email'} component={TextInput} label={'Correo'} type={"text"} hasPlaceholder={false} />
                                        <Field name={'phoneNumber'} component={TextInput} label={'Número de teléfono'} type={"text"} hasPlaceholder={false} />
                                        
                                        <div className="flex m-3 items-center justify-end p-3 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => {setOpen(false); }}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        className={`bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
            
                                        onClick={handleSubmit((values) => {
                                            isNew ? createUser({userType: selected.id, ...values}, setOpen) 
                                            : editUser(values, setOpen)
                                        })} disabled={submitting} type="submit"
                                    >
                                       {isNew ? 'Crear Usuario' : 'Editar Usuario'}
                                    </button>
                                </div>
                                    </form>
                                </div>
                            </div>
                            </div>
                        </div>
                        </Transition.Child>
                    </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </Fragment>
    );
};

export default connect(
    state => ({
      isLoading: selectors.getIsAuthenticating(state),
      users: selectors.getUsers(state),
      initialValues: selectors.getSelectedUser(state),   
      isNew: selectors.getSelectedUser(state) == null,   
    }),
    dispatch => ({
      fetchUsers(values) {
        dispatch(actionsUsers.startFetchingUsers(values));
      },
      createUser(values, setOpen) {
        if(values.username && values.password && values.first_name && values.last_name && values.email && values.phoneNumber && values.userType) {
            dispatch(actionsUsers.startAddingUser(values));
            setOpen(false);
        }
      },
      editUser(values, setOpen) {
        if(values.username && values.password && values.first_name && values.last_name && values.email && values.phoneNumber && values.userType) {
            dispatch(actionsUsers.startEditingUser({...values, password: undefined}));
            setOpen(false);
        }
      },
      selectUser(user ,setOpen) {
        dispatch(actionsUsers.selectUser({password: 'password', ...user}));
        setOpen(true);
      },
      deselectUser(setOpen) {
        dispatch(actionsUsers.deselectUser());
        setOpen(true);
      },
    }),
  )(reduxForm({ 
    form: 'editUser',
    enableReinitialize : true,    
    validate: (values) => {
        const errors = {};
  
        errors.username = !values.username
            ? 'Este campo es obligatorio'
            : undefined;
        errors.password = !values.password
          ? 'Este campo es obligatorio'
          : undefined;
        errors.first_name = !values.first_name
            ? 'Este campo es obligatorio'
            : undefined;
        errors.last_name = !values.last_name
          ? 'Este campo es obligatorio'
          : undefined;
        errors.email = !values.email
          ? 'Este campo es obligatorio'
          : undefined;
        errors.phoneNumber = !values.phoneNumber
          ? 'Este campo es obligatorio'
          : undefined;
      return errors;
    }
  })(Users));