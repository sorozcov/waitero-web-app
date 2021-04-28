import React, { Fragment, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {connect} from 'react-redux';

import Navbar from '../Navbar';
import ProductList from "../ProductList";
import './index.css';


const Products = ({onLoad, products}) => {
    const history = useHistory()
    return(
        <Fragment>
            <Navbar route={6}/>
            <header className="bg-white shadow pt-20 mb-5">
                <div className="w-11/12 mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold text-gray-900">
                    Ofertas
                </h1>
                </div>
            </header>
                <ProductList/>
        </Fragment>
    )
}

export default connect(
    undefined,
    undefined
)(Products)