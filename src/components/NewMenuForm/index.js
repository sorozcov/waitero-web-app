import React, {Fragment} from "react";
import {Field, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {v4 as uuidv4} from "uuid";
import TextInput from "../Common/textInput";

import * as selectors from '../../logic/reducers'
import * as menuActions from "../../logic/actions/menus";
const Checkbox = props => (
    <div className="form-group">
        <label htmlFor={props.name}>{props.label}</label>
        <input type="checkbox" id={props.name} {...props}/>
        {props.touched && props.error && (
            <p className="error">{props.error}</p>
        )}
    </div>
)

const NewMenuForm = ({handleSubmit, saveMenu, products}) => (
    <Fragment>
        <div className="flex justify-center z-40">
            <form className="space-y-6 w-full">
                <Field name={'productName'} component={TextInput} label={'Nombre del menú'} type={"text"}/>
                <Field name={'productPrice'} component={TextInput} label={'Precio'} type={"text"}/>
                <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-secondary"
                    onClick={handleSubmit(saveMenu)}>
                    GUARDAR
                    <span className="flex items-center pl-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V6h5a2 2 0 012 2v7a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2h5v5.586l-1.293-1.293zM9 4a1 1 0 012 0v2H9V4z" />
                        </svg>
                    </span>
                </button>
                <Field name={`test`} component={Checkbox}
                       type="checkbox" className="z-40"/>
                <table className='min-w-max w-full table-auto'>
                    <thead>
                        <tr>
                            <th className="py-3 px-6 text-left">
                                Check
                            </th>
                            <th className="py-3 px-6 text-left">
                                Producto
                            </th>
                            <th className="py-3 px-6 text-left">
                                Precio
                            </th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm">
                    {products.map(product =>
                        <tr className={`border-b border-gray-200 hover:bg-gray-50`}>
                            <td className="py-2 px-6 text-left whitespace-nowrap">
                                <Field name={`selected${product.id}`} component={Checkbox}/>
                            </td>
                            <td className="py-2 px-6 text-left whitespace-nowrap">
                                <div>
                                    {product.name}
                                </div>
                            </td>
                            <td className="py-2 px-6 text-left whitespace-nowrap">
                                <div>
                                    {product.price}
                                </div>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
            </form>
        </div>
    </Fragment>
)

export default connect(
    (state) => ({
        products: selectors.getAllProducts(state)
    }),
    (dispatch) => ({
        saveMenu(values){
            console.log(values)
            dispatch(menuActions.startAddingMenu(
                {
                    ...values,
                    id: uuidv4()
                }
            ))
        }
    })
)(reduxForm({
    form:'newMenu',
})(NewMenuForm))
