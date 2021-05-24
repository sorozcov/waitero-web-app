import React, { Fragment, useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';

import './styles.css';
import * as selectors from '../../logic/reducers';
import * as actions from '../../logic/actions/restaurants';
import * as branchActions from '../../logic/actions/branches';
// import { branches, restaurants } from '../../constants/data';
import { uuid } from 'uuidv4';

const RestaurantDetails = ({
    restaurant,
    branches,

    fetchBranches,
    selectBranch,
    createBranch
}) => {
    // useEffect( () => {
    //     fetchBranches();
    // }, [ ] );

    const history = useHistory();
    const { restaurantId } = useParams();
    const [showModal, setShowModal] = useState(false);
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    let branch = null;
    // let restaurant = null;

    branches.forEach( 
        agency => {
            if(agency.restaurant_id == restaurantId) {
                branch = agency;
            };

            return branch;
        }
    );



    return (
        <Fragment>

            {
                restaurant !== null && (
                    <Fragment>
                         <header className="bg-white shadow pt-20">
                        <div className="w-11/12 mx-auto py-6 px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-900">{restaurant.name}</h1>
                        </div>
                    </header>
                     
                        
                        <div className="min-w-screen flex items-right justify-end font-sans overflow-hidden my-8 mx-8">
                            <div className="flex justify-end">
                            <button
                                className="bg-transparent hover:bg-blue-500 mb-5 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded justify-end"
                                type="button"
                                onClick={() => setShowModal(true)}
                            >
                                Nueva Sucursal
                            </button>
                            </div>
                        </div>
                        <div style={{marginTop: '-50px'}}>
                            <div className="min-w-screen flex items-center justify-center font-sans overflow-hidden my-8">
                                <div className="w-full lg:w-5/6">
                                    <div className="bg-white shadow-md rounded my-6">
                                    <div className="grid grid-cols-6 gap-4">
                                        <div className="col-start-1 col-end-3">
                                            <p className="text-lg antialiased font-semibold tracking-wide p-4">
                                                Sucursales
                                            </p>
                                        </div>
                                        
                                    </div>
                                        
                                        <table className="min-w-max w-full table-auto">
                                            <thead>
                                                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                                                    <th className="py-3 px-6 text-left">#</th>
                                                    <th className="py-3 px-6 text-left">NOMBRE</th>
                                                    <th className="py-3 px-6 text-left">DIRECCIÓN</th>
                                                </tr>
                                            </thead>
                                            <tbody 
                                                className="text-gray-600 text-sm font-light cursor-pointer" 
                                                onClick = { () => {
                                                    selectBranch(branch)
                                                    history.push(`/restaurants/${restaurantId}/branch/${branch.id}`)
                                                } }>
                                                <tr className="border-b border-gray-200 hover:bg-gray-100">
                                                    <td className="py-3 px-6 text-left whitespace-nowrap">
                                                        <div className="flex items-center">
                                                            <span className="font-medium">{branch.id}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-6 text-left">
                                                        <div className="flex items-center">
                                                            <span>{branch.name}</span>
                                                        </div>
                                                    </td>
                                                    <td className="py-3 px-6 text-center">
                                                        <div className="flex items-center">
                                                            <span className="font-medium">{branch.location}</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody> 
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Fragment>
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
                                            Crear Sucursal
                                            </h3>
                                        </div>
                                        <div className="relative p-6 flex-auto p-8">
                                            <form className="w-full max-w-lg">
                                                <div className="flex flex-wrap -mx-3 mb-6">
                                                    <div className="w-full px-3">
                                                        <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                                            Nombre
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
                                                            Dirección
                                                        </label>
                                                        <input 
                                                            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
                                                            id="grid-restaurant-name" 
                                                            placeholder="Nombre"
                                                            onChange = { e => setAddress(e.target.value) }
                                                        />
                                                        <p className="text-gray-600 text-xs italic">Campo requerido</p>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                        <div className="flex m-3 items-center justify-end p-3 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => {setShowModal(false); }}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        className={`bg-blue-500 text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
            
                                        onClick={ () => {
                                            createBranch({
                                                name: name,
                                                restaurant_id: restaurantId,
                                                location: address,
                                                id:uuid()
                                            });
                                            setShowModal(false)
                                        } }
                                    >
                                       {'Crear Sucursal'}
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
        restaurant: selectors.getSelectedRestaurant(state),
        branches: selectors.getBranches(state),
    }),
    dispatch => ({
        fetchBranches() {
            dispatch(branchActions.startFetchingBranches());
        },
        selectBranch(branch) {
            dispatch(branchActions.selectingBranch(branch));
        },
        createBranch(branch) {
            dispatch(branchActions.startAddingBranch(branch))
        }
    })
)(RestaurantDetails);