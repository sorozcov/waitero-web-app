import React, {Fragment, useEffect, useState} from "react";
import {connect} from "react-redux";

import './styles.css'
import Product from "../Product";
import * as selectors from "../../logic/reducers";
import * as productActions from "../../logic/actions/products";
import {history} from "../App/App";
import {Dialog, Transition} from "@headlessui/react";
import {XIcon} from "@heroicons/react/outline";
import NewMenuForm from "../NewMenuForm";
import NewProductForm from "../NewProductForm";

const ProductList = ({onLoad, onSelectRow, products}) => {
    useEffect(onLoad, [])
    const [open, setOpen] = useState(false)
    return (
        <Fragment>
            <Fragment>
                <button
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                    onClick={() => setOpen(true)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                    <span>Nuevo producto</span>
                </button>
                <table className='min-w-max w-full table-auto'>
                    <thead>
                    <tr>
                        <th className="py-3 px-6 text-left">
                            #
                        </th>
                        <th className = "px-3 text-left">
                            Producto
                        </th>
                        <th className="py-3 px-6 text-left">
                            Precio
                        </th>
                        <th className="py-3 px-6 text-left">
                            Editar
                        </th>
                    </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                    {
                        products.map(
                            (product, index) => <Product key={product.id} product={product} index={index+1}/>
                        )
                    }
                    </tbody>
                </table>
            </Fragment>
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
                                <div className="relative w-screen max-w-md">
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
                                                <XIcon className="h-6 w-6" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </Transition.Child>
                                    <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                                        <div className="px-4 sm:px-6">
                                            <Dialog.Title className="text-lg font-medium text-gray-900">AGREGAR PRODUCTO</Dialog.Title>
                                        </div>
                                        <div className="mt-6 relative flex-1 px-4 sm:px-6">
                                            <NewProductForm/>
                                        </div>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </Fragment>

    )
}

export default connect(
    state => ({
        products: selectors.getAllProducts(state)
    }),
    dispatch =>({
        onLoad(){
            dispatch(productActions.startFetchingProduct())
        }
    })
)(ProductList)