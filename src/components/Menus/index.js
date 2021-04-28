import React, {Fragment} from 'react'

import Navbar from "../Navbar";
import MenuList from "../MenuList";

const Menus = () => (
    <Fragment>
        <Navbar route={7}/>
        <header className="bg-white shadow pt-20 mb-5">
            <div className="w-11/12 mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold text-gray-900">
                Productos
            </h1>
            </div>
        </header>
        <MenuList/>
    </Fragment>
)

export default Menus