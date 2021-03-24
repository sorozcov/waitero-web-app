import React, { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';

import Navbar from '../Navbar';
import './styles.css';
import { branches, restaurants } from '../../constants/data';

const RestaurantDetails = () => {
    const { restaurantId } = useParams();
    const [showModal, setShowModal] = useState(false);

    let branch = null;
    let restaurant = null;

    branches.forEach( 
        agency => {
            if(agency.restaurant_id == restaurantId) {
                branch = agency;
            };

            return branch;
        }
    );

    restaurants.forEach( 
        place => {
            if(place.id == restaurantId) {
                restaurant = place;
            };

            return restaurant;
        }
    );

    return (
        <Fragment>
            <Navbar />

            <div class="min-w-screen flex items-center justify-center m-16">
                <img src = {restaurant.logo} className = 'logo' />
            </div>

            
            <div class="overflow-x-auto">
                <div class="min-w-screen flex items-center justify-center font-sans overflow-hidden my-16">
                    <div class="w-full lg:w-5/6">
                        <div class="bg-white shadow-md rounded my-6">
                        <div class="grid grid-cols-6 gap-4">
                            <div class="col-start-1 col-end-3">
                                <p class="text-lg antialiased font-semibold tracking-wide p-4">
                                    Sucursales
                                </p>
                            </div>
                            <div class="col-end-7 col-span-2">
                                <button
                                    className="bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 mx-12"
                                    type="button"
                                    onClick={() => setShowModal(true)}
                                >
                                    Crear Sucursal
                                </button>
                            </div>
                        </div>
                            
                            <table class="min-w-max w-full table-auto">
                                <thead>
                                    <tr class="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                        <th class="py-3 px-6 text-left">#</th>
                                        <th class="py-3 px-6 text-left">NOMBRE</th>
                                        <th class="py-3 px-6 text-left">DIRECCIÓN</th>
                                    </tr>
                                </thead>
                                <tbody class="text-gray-600 text-sm font-light">
                                    <tr class="border-b border-gray-200 hover:bg-gray-100">
                                        <td class="py-3 px-6 text-left whitespace-nowrap">
                                            <div class="flex items-center">
                                                <span class="font-medium">{branch.id}</span>
                                            </div>
                                        </td>
                                        <td class="py-3 px-6 text-left">
                                            <div class="flex items-center">
                                                <span>{branch.name}</span>
                                            </div>
                                        </td>
                                        <td class="py-3 px-6 text-center">
                                            <div class="flex items-center">
                                                <span class="font-medium">{branch.location}</span>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
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
                                            Crear Sucursal
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
                                        <form class="w-full max-w-lg">
                                            <div class="flex flex-wrap -mx-3 mb-6">
                                                <div class="w-full px-3">
                                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                                        Nombre
                                                    </label>
                                                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-restaurant-name" placeholder="Nombre"/>
                                                    <p class="text-gray-600 text-xs italic">Campo requerido</p>
                                                </div>
                                            </div>

                                            <div class="flex flex-wrap -mx-3 mb-6">
                                                <div class="w-full px-3">
                                                    <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                                        Dirección
                                                    </label>
                                                    <input class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-restaurant-name" placeholder="Nombre"/>
                                                    <p class="text-gray-600 text-xs italic">Campo requerido</p>
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

export default RestaurantDetails;