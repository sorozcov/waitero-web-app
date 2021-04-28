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
            <div className='px-8 py-8'>
                <h1 className='text-5xl font-bold'>PRODUCTOS</h1>
                <hr className="divider"/>
                <ProductList/>
            </div>
        </Fragment>
    )
}

export default connect(
    undefined,
    undefined
)(Products)