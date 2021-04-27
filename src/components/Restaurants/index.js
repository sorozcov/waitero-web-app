import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';

import './styles.css';
import { restaurants } from '../../constants/data';

const Restaurants = () => {
    const history = useHistory();
    const [showModal, setShowModal] = useState(false);

    return (
        <Fragment>
            
            <div className= 'px-8 py-8  pt-20'>
                <h1 className= 'text-5xl font-bold'>RESTAURANTES</h1>
                <hr className = "divider" />
            </div>

            <div className="min-w-screen flex items-right justify-right font-sans overflow-hidden my-16">
                <button
                    className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mx-12"
                    type="button"
                    onClick={() => setShowModal(true)}
                >
                    Crear Restaurante
                </button>
            </div>

            <div className= 'grid grid-cols-4 gap-4 px-8'>
                {
                    restaurants.map( restaurant => 
                        <div className="flex flex-col justify-between w-40 sm:w-96 h-64 bg-center text-gray-800 shadow-md overflow-hidden cursor-pointer" style={{ backgroundImage:`url(${restaurant.food})`}} onClick = { () => history.push(`/restaurants/${restaurant.id}`)}>
                            <div className="flex justify-between items-center ml-4 pr-8">
                                {/* <div className="bg-red-600 text-white bg-opacity-95 shadow px-2 py-1 flex items-center font-bold text-xs rounded">
                                    Some information
                                </div>
                                <div className="bg-red-600 w-10 h-12 shadow flex flex-col-reverse p-2 text-center font-bold text-white rounded-b-full">
                                    %
                                </div> */}
                            </div>
                            <div className="bg-white bg-opacity-95 shadow-md rounded-r-xl p-4 flex flex-col mr-4 mb-8">
                                {/* <h3 className="text-xl font-bold pb-2">{restaurant.name}</h3> */}
                                <img src = { restaurant.logo} alt="" style = {{maxHeight: '75px', width: 'auto'}}/>
                            </div>
                        </div>
                    )
                }
            </div>

            {
                showModal && (
                    <>
                        <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                            <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                {/*content*/}
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                    {/*header*/}
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-blueGray-200 rounded-t">
                                        <h3 className="text-3xl font-semibold">
                                            Crear Restaurante
                                        </h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setShowModal(false)}
                                        >
                                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                            </span>
                                        </button>
                                    </div>
                                    {/*body*/}
                                    <div className="relative p-6 flex-auto p-8">
                                        <form className="w-full max-w-lg">
                                            <div className="flex flex-wrap -mx-3 mb-6">
                                                <div className="w-full px-3">
                                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                                        Nombre del Restaurante
                                                    </label>
                                                    <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-restaurant-name" placeholder="Nombre"/>
                                                    <p className="text-gray-600 text-xs italic">Campo requerido</p>
                                                </div>
                                            </div>

                                            <div className="flex flex-wrap -mx-3 mb-6">
                                                <div className="w-full px-3">
                                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                                        Logo del Restaurante
                                                    </label>
                                                    <input className="appearance-none block w-full text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-restaurant-name" type = "file" placeholder="Nombre"/>
                                                    <p className="text-gray-600 text-xs italic">Campo requerido</p>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-3 border-t border-solid border-blueGray-200 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Cerrar
                                        </button>
                                        <button
                                            className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Crear
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                    </>
                ) 
            }
        </Fragment>
    );
};

export default Restaurants;