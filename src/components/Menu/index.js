import React, {Fragment} from "react";
import {connect} from 'react-redux'

import Product from "../Product";
import * as menuActions from '../../logic/actions/menus'
import * as selectors from '../../logic/reducers'

const Menu = ({menu, onSelectRow, selectedMenu, index, toggleItems}) => (
    <Fragment>
        <tr className={`border-b border-gray-200 hover:bg-gray-50 ${selectedMenu && selectedMenu.id === menu.id ? 'bg-gray-200':''}`} onClick={onSelectRow}>
            <td className="py-3 px-6 text-left whitespace-nowrap">
                <div className="flex items-center">
                    <span className="font-medium">{index}</span>
                </div>
            </td>
            <td className="py-3 px-3 text-left whitespace-nowrap">
                <div className="flex items-center">
                    <span className="font-medium">{menu.name}</span>
                </div>
            </td>
            <td className="py-3 px-6 text-left">
                <div className="flex items-center">
                    <span className="font-medium">{menu.price}</span>
                </div>
            </td>
            <td className="py-3 px-6 text-center">
                <div className="flex items-start justify-start">
                    <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110" >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" onClick={toggleItems}>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                   d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                        </svg>
                    </div>
                    <div className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"/>
                        </svg>
                    </div>
                </div>
            </td>
        </tr>
        {
            menu.showItems &&
            <tr>
                {menu.products.map(product => <div>1</div>)}
            </tr>
        }
    </Fragment>
)

export default connect(
    (state) => ({
        selectedMenu: selectors.getSelectedMenu(state)
    }),
    (dispatch, {menu}) => ({
        onSelectRow(){
            dispatch(menuActions.selectMenu(menu.id))
        },
        toggleItems(){
            if (!menu.showItems){
                dispatch(menuActions.showMenuItems(menu.id))
            }else {
                dispatch(menuActions.hideMenuItems(menu.id))
            }
        }
    })
)(Menu)