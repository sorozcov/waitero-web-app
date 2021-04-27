import React, {Fragment, useEffect} from "react";
import {connect} from "react-redux";

import * as menuActions from '../../logic/actions/menus'
import * as selectors from '../../logic/reducers'
import Menu from "../Menu";

const MenuList = ({menus, onLoad}) => {
    useEffect(onLoad, [])
    return (
        <Fragment>
            <table className='min-w-max w-full table-auto'>
                <thead>
                <tr>
                    <th className="py-3 px-6 text-left">
                        #
                    </th>
                    <th className="px-3 text-left">
                        Nombre
                    </th>
                    <th className="py-3 px-6 text-left">
                        Precio
                    </th>
                    <th className="py-3 px-6 text-left">
                        Acciones
                    </th>
                </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                    {
                        menus.map((menu, index) => <Menu key={menu.id} menu={menu} index={index + 1}/>)
                    }
                </tbody>
            </table>
        </Fragment>
    )
}

export default connect(
    state => ({
        menus: selectors.getAllMenus(state)
    }),
    dispatch => ({
        onLoad() {
            dispatch(menuActions.startFetchingMenu())
        }
    })
)(MenuList)