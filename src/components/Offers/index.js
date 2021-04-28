import { connect } from 'react-redux';
import React, { Fragment, useEffect, useState } from 'react';

import { XIcon } from '@heroicons/react/outline';
import { Dialog, Transition } from '@headlessui/react';

import Select from '../Select';

import './styles.css';

import * as selectors from '../../logic/reducers';
import * as actionsOffers from '../../logic/actions/offers';

const Offers = ({ offers, startAddingOffer, fetchOffers, startEditingOffer, startRemovingOffer }) => {
    // fetch values for table
    useEffect(fetchOffers, [fetchOffers]);
    
    // show add offer modal
    const [showModal, setShowModal] = useState(false)
    
    // form values
    const [nombre, setNombre] = useState("")
    const [percentage, setPercentage] = useState(0)
    const [init, setInit] = useState("")
    const [end, setEnd] = useState("")
    const [product, setProduct] = useState(1)
    const [activeOffer, setActiveOffer] = useState(null)

    // check all fields are filled
    const disableButton = () => {
        if(activeOffer)
        {
            if ((nombre === activeOffer.name || nombre === "") && (percentage === activeOffer.percentage || percentage === "") && (init === "" || init === activeOffer.start_date) && (end === "" || end === activeOffer.end_date))
            {
                return true;
            }
        }
        
        if (nombre === "" || (percentage === 0 || percentage === "") || init === "" || end === "")
        {
            return true;
        }

        return false;
    }

    // clear fields after POST
    const clearValues = () => {
        setNombre(null);
        setPercentage(null);
        setInit("");
        setEnd("");
        setProduct(1);
    }

    // POST the new offer to the API
    const postOffer = () => {
        const offer = {
            name: nombre,
            percentage: percentage,
            start_date: init,
            end_date: end,
            product: product
        };

        startAddingOffer(offer);
        
        clearValues();
    }

    // UPDATE the selected offer to the API
    const updateOffer = () => {
        
        const offer = {
            name: nombre,
            percentage: percentage,
            start_date: init,
            end_date: end,
            product: product
        };

        startEditingOffer(offer, activeOffer.id);

        clearValues();

        setActiveOffer(null);
    }

    // EDIT offer
    const setProductValues = offer => {
        setNombre(offer.name);
        setPercentage(offer.percentage);
        setInit(offer.start_date);
        setEnd(offer.end_date);
        setProduct(offer.product);
    }

    // DELETE offer
    const removeOffer = id => {
        startRemovingOffer(id);
    }

    // visual
    return (
        <Fragment>
            <header className="bg-white shadow pt-20">
                <div className="w-11/12 mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Ofertas
                </h1>
                </div>
            </header>
            <main>
                <div className="w-11/12 mx-auto py-6 sm:px-6 lg:px-8">
                    <div className="flex justify-end">
                        <button className="bg-transparent hover:bg-blue-500 mb-5 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded" onClick={() => setShowModal(true)}>
                            Nueva promoción
                        </button>
                    </div>
                    <div className="flex justify-center">
                        <div className="w-full">
                            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Nombre
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Producto
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Descuento
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Estado
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Inicia
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                            Finaliza
                                        </th>
                                        <th scope="col" className="relative px-6 py-3">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {offers.map(offer => (
                                        <tr key={offer.id}>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 h-10 w-10">
                                                        <img className="h-8 w-8 rounded-full" src={'https://images.onlinelabels.com/images/clip-art/j4p4n/Fast%20Food%20Icon-289282.png'} alt="" />
                                                    </div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {offer.name}
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {offer.product}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {offer.percentage + "%"}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                    Activa
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {offer.start_date}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {offer.end_date}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <button
                                                    className="bg-gray-400 text-white active:bg-blue-600 hover:bg-blue-500 font-bold uppercase text-sm px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={() => {setShowModal(true); setProductValues(offer); setActiveOffer(offer)}}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    className="bg-gray-400 text-white active:bg-red-600 hover:bg-red-500 font-bold uppercase text-sm px-2 py-2 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                    type="button"
                                                    onClick={() => {removeOffer(offer.id)}}
                                                >
                                                    Quitar
                                                </button>
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
            <Transition.Root show={showModal} as={Fragment}>
                <Dialog as="div" className="fixed inset-0 overflow-hidden" open={showModal} onClose={setShowModal}>
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
                                onClick={() => {setShowModal(false); clearValues()}}
                                >
                                <span className="sr-only">Close panel</span>
                                <XIcon className="h-6 w-6" aria-hidden="true" />
                                </button>
                            </div>
                            </Transition.Child>
                            <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                            <div className="px-4 sm:px-6">
                                <Dialog.Title className="text-lg font-medium font-bold text-gray-700">Nueva promoción</Dialog.Title>
                            </div>
                            <div className="mt-6 relative flex-1 px-4 sm:px-6">
                                <div className="h-5/6 border-2 border-dashed border-gray-200" aria-hidden="true" />
                                <div className="absolute inset-0 px-4 sm:px-6 ">
                                <div className="relative p-6 flex-auto p-8">
                                    <form className="w-full max-w-lg">
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-full px-3">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                                    Nombre de la promoción
                                                </label>
                                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-restaurant-name" placeholder="Nombre" value={nombre} onChange={e => setNombre(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-full px-3">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                                    Descuento
                                                </label>
                                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-restaurant-name" placeholder="Descuento" type="number" value={percentage} onChange={e => setPercentage(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-full px-3">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                                    Inicio
                                                </label>
                                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-restaurant-name" type="date" value={init} onChange={e => setInit(e.target.value)}/>
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-full px-3">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                                    Fin
                                                </label>
                                                <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-restaurant-name" type="date" value={end} onChange={e => setEnd(e.target.value)}/>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap -mx-3 mb-6">
                                            <div className="w-full px-3">
                                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-password">
                                                    Producto
                                                </label>
                                                <Select list={null} func={setProduct}/>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                                <div className="flex m-3 items-center justify-end p-3 rounded-b">
                                    <button
                                        className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                        type="button"
                                        onClick={() => {setShowModal(false); clearValues()}}
                                    >
                                        Cancelar
                                    </button>
                                    <button
                                        className={`${disableButton() ? 'bg-blue-100' : 'bg-blue-500'} text-white active:bg-blue-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                                        type="button"
                                        onClick={() => {setShowModal(false); activeOffer ? updateOffer() : postOffer()}}
                                        disabled={disableButton()}
                                    >
                                        {activeOffer ? 'Editar' : 'Crear'}
                                    </button>
                                </div>
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
        offers: selectors.getOffers(state),
    }),
    dispatch => ({
        fetchOffers(values) {
            dispatch(actionsOffers.startFetchingOffers());
        },
        startAddingOffer(offer) {
            dispatch(actionsOffers.startAddingOffer(offer))
        },
        startEditingOffer(offer, id) {
            dispatch(actionsOffers.startEditingOffer(offer, id))
        },
        startRemovingOffer(id) {
            dispatch(actionsOffers.startRemovingOffer(id))
        }
    }),
  )(Offers);