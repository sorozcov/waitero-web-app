import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

import './styles.css';
import dFood from '../../assets/default_food.jpg'
// import { restaurants } from '../../constants/data';
import * as actions from '../../logic/actions/restaurants';
import * as selectors from '../../logic/reducers';

const Restaurants = ({
    restaurants,
    isLoading,
    isCreating,

    fetchRestaurants,
    createRestaurant,
    selectRestaurant
}) => {
useEffect( () => {
        fetchRestaurants();
    }, [ ] )

    const history = useHistory();
    const [showModal, setShowModal] = useState(false);
    const [ name, setName ] = useState("");

    return (
        <Fragment>
            
            <div className= 'px-8 py-8  pt-20'>
                <h1 className= 'text-5xl font-bold mt-8'>RESTAURANTES</h1>
                <hr className = "divider" />
            </div>

            <div className="min-w-screen flex items-right justify-right font-sans overflow-hidden my-8 mx-8">
                <button
                    className="bg-transparent hover:bg-blue-500 mb-5 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                    type="button"
                    onClick={() => setShowModal(true)}
                >
                    Crear Restaurante
                </button>
            </div>

            {
                restaurants.length > 0 && (
                    <div className= 'grid grid-cols-4 gap-4 px-8'>
                        {
                            restaurants.map( restaurant => 
                                <div className="flex flex-col justify-between w-40 sm:w-96 h-64 bg-center text-gray-800 shadow-md overflow-hidden cursor-pointer" style={{ backgroundImage:`url(${dFood})`}} onClick = { () => {
                                    selectRestaurant(restaurant);
                                    history.push(`/restaurants/${restaurant.id}`);
                                } }>
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
                                        <img src = { restaurant.logo} alt = {restaurant.name } style = {{maxHeight: '75px', width: 'auto'}}/>
                                    </div>
                                </div>
                            )
                        }
                    </div>
                )
            }

            {
                showModal && (
                    <section class="fixed inset-0 overflow-hidden" aria-labelledby="slide-over-title" role="dialog" aria-modal="true">
                        <div class="absolute inset-0 overflow-hidden">
                            <div class="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true">
                            </div>
                            
                            <div class="fixed inset-y-0 right-0 pl-10 max-w-full flex">
                                <div class="relative w-screen max-w-md">
                                    <div class="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                                        <button class="rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white" onClick = { () => setShowModal(false) }>
                                            <span class="sr-only">Close panel</span>
                                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>

                                    <div class="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                                        <div class="px-4 sm:px-6">
                                            <h3 className="text-3xl font-semibold">
                                                Crear Restaurante
                                            </h3>
                                        </div>
                                        <div className="relative p-6 flex-auto p-8">
                                            <form className="w-full max-w-lg">
                                                <div className="flex flex-wrap -mx-3 mb-6">
                                                    <div className="w-full px-3">
                                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                                            Nombre del Restaurante
                                                        </label>
                                                        <input 
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                                            id="grid-restaurant-name" 
                                                            placeholder="Nombre"
                                                            onChange = { e => setName(e.target.value) }
                                                        />
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

                                        <div className="flex items-center justify-end p-3 border-t border-solid border-blueGray-200 rounded-b">
                                            <button
                                                className="bg-transparent hover:bg-red-500 mb-5 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded mx-8"
                                                type="button"
                                                onClick={() => setShowModal(false)}
                                            >
                                                Cerrar
                                            </button>
                                            <button
                                                className="bg-transparent hover:bg-blue-500 mb-5 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mx-8"
                                                type="button"
                                                onClick={() => createRestaurant(name) }
                                            >
                                                Crear
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                ) 
            }
        </Fragment>
    );
};

export default connect(
    state => ({
        restaurants: selectors.getRestaurants(state),
        isLoading: selectors.getIsFetchingRestaurant(state),
        isCreating: selectors.getIsAddingRestaurant(state),
    }),
    dispatch => ({
        fetchRestaurants() {
            dispatch(actions.startFetchingRestaurants());
        },
        createRestaurant(name) {
            dispatch(actions.startAddingRestaurant({ "name": name }));
        },
        selectRestaurant(restaurant) {
            dispatch(actions.selectingRestaurant(restaurant))
        }
    })
)(Restaurants);