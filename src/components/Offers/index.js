import { connect } from 'react-redux';
import React, { Fragment, useEffect, useState, useRef } from 'react';

import { XIcon, ExclamationIcon } from '@heroicons/react/outline';
import { Dialog, Transition } from '@headlessui/react';

import Select from '../Select';

import './styles.css';

import * as selectors from '../../logic/reducers';
import * as actionsOffers from '../../logic/actions/offers';

const Offers = ({ branch, offers, startAddingOffer, fetchOffers, startEditingOffer, startRemovingOffer }) => {
    // fetch values for table
    useEffect(fetchOffers, [fetchOffers]);

    const cancelButtonRef = useRef()

    // show add offer modal
    const [showModal, setShowModal] = useState(false)
    const [open, setOpen] = useState(false)
    
    // form values
    const [nombre, setNombre] = useState("")
    const [percentage, setPercentage] = useState(null)
    const [init, setInit] = useState("")
    const [end, setEnd] = useState("")
    const [product, setProduct] = useState(1)
    const [activeOffer, setActiveOffer] = useState(null)

    // check all fields are filled
    const disableButton = () => {
        if(activeOffer)
        {
            if ((activeOffer.product === product) && (nombre === activeOffer.name || nombre === "") && (percentage === activeOffer.percentage || percentage === "") && (init === "" || init === activeOffer.start_date) && (end === "" || end === activeOffer.end_date))
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
            product: product,
            branch: branch.id,
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
                            Nueva oferta
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
                                                    onClick={() => {setOpen(true); setActiveOffer(offer)}}
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
                <Transition.Root show={open} as={Fragment}>
                    <Dialog
                        as="div"
                        static
                        className="fixed z-10 inset-0 overflow-y-auto"
                        initialFocus={cancelButtonRef}
                        open={open}
                        onClose={setOpen}
                    >
                        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                        </Transition.Child>

                        {/* This element is to trick the browser into centering the modal contents. */}
                        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                            &#8203;
                        </span>
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                <div className="sm:flex sm:items-start">
                                <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                    <ExclamationIcon className="h-6 w-6 text-red-600" aria-hidden="true" />
                                </div>
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                    <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-gray-900">
                                    Eliminar oferta
                                    </Dialog.Title>
                                    <div className="mt-2">
                                    <p className="text-sm text-gray-500">
                                        ¿Está seguro que desea eliminar la oferta? Toda la información se eliminará permanentemente.
                                        Esta acción no se puede deshacer.
                                    </p>
                                    </div>
                                </div>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                type="button"
                                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={() => {setOpen(false); removeOffer(activeOffer.id); setActiveOffer(null)}}
                                >
                                Eliminar
                                </button>
                                <button
                                type="button"
                                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                onClick={() => setOpen(false)}
                                ref={cancelButtonRef}
                                >
                                Cancelar
                                </button>
                            </div>
                            </div>
                        </Transition.Child>
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