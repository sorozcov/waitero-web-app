import React, {Fragment} from 'react'

import Navbar from "../Navbar";
import MenuList from "../MenuList";

const Menus = () => (
    <Fragment>
        <Navbar route={7}/>
        <div className='px-8 py-8'>
            <h1 className='text-5xl font-bold'>PRODUCTOS</h1>
            <hr className="divider"/>
            <MenuList/>
        </div>
    </Fragment>
)

export default Menus