import React, {Fragment} from 'react'
import { history } from '../App/App.js';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import Navbar from "../Navbar";
import TextInput from "../Common/textInput";
import * as productActions from '../../logic/actions/products'
import {v4 as uuidv4} from 'uuid'


const NewProductForm = ({handleSubmit, saveProduct}) => {
    return (
        <Fragment>
            <Navbar route={7}/>
            <div className='px-8 py-8'>
                <h1 className='text-5xl font-bold'>AGREGAR PRODUCTO</h1>
                <hr className="divider"/>
            </div>
            <div className="flex justify-center">
                <form className="space-y-6 w-1/2" onSubmit={handleSubmit(saveProduct)}>
                    <Field name={'productName'} component={TextInput} label={'Nombre del producto'} type={"text"}/>
                    <Field name={'productPrice'} component={TextInput} label={'Precio'} type={"text"}/>
                    <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary">
                        GUARDAR
                        <span className="flex items-center pl-1">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                            </svg>
                        </span>
                    </button>
                </form>
            </div>
        </Fragment>
    )
}

export default connect(
    undefined,
    (dispatch) => ({
        saveProduct(values){
            console.log(values)
            dispatch(productActions.startAddingProduct(
                {
                    ...values,
                    id: uuidv4()
                }
            ))
        }
    })
)(reduxForm({
    form:'newProduct',
})(NewProductForm))
