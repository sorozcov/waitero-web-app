import React, {Fragment, useEffect} from "react";
import {connect} from "react-redux";

import './styles.css'
import Product from "../Product";
import * as selectors from "../../logic/reducers";
import * as productActions from "../../logic/actions/products";
import {history} from "../App/App";

const ProductList = ({onLoad, onSelectRow, products}) => {

    useEffect(onLoad, [])
    return (
        <Fragment>
            <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center"
                onClick={() => history.replace("/add_product")}>
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
                        product => <Product key={product.id} product={product}/>
                    )
                }
                </tbody>
            </table>
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