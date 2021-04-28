import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';

import * as actions from '../../logic/actions/branches';
import * as selectors from '../../logic/reducers';
import BranchProducts from './BranchProducts';
import BranchCombos from './BranchCombos';
import BranchPromotions from './BranchPromotions';

const Branches = ({
    branch,
    restaurant
}) => {
    const [ selectedTab, setSelectedTab ] = useState(0);

    return (
        <Fragment>
            <div className= 'px-8   pt-20'>
                <h1 className= 'text-5xl font-bold mt-8'>{ branch.name }</h1>
                <hr className = "divider" />
            </div>

            {/* <div className= 'px-12 py-5'>
                <p className= 'text-xl'>{ restaurant.name }</p>
                <p className= 'text-xl'>{ branch.location }</p>
            </div> */}

            <div class="mt-10 mb-4 mx-8">
                <ul class="ml-4">
                    <li class="mb-2 px-4 py-4 text-gray-00 flex flex-row  border-gray-300 hover:font-bold rounded rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                        </svg>
                        <h6 className='text-xl font-light mx-4'> {restaurant.name }</h6>
                    </li>

                    <li class="mb-2 px-4 py-4 text-gray-00 flex flex-row  border-gray-300 hover:font-bold rounded rounded-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <h6 className='text-xl font-light mx-4'> {branch.location }</h6>
                    </li>
                </ul>
            </div>

            <div class="bg-gray-100 px-16">
                <nav class="flex flex-col sm:flex-row">
                    <button 
                        class = { selectedTab === 0 ? "text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 border-b-2 font-medium border-blue-500" : "text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none" }
                        onClick = { () => setSelectedTab(0) }
                    >
                        Productos
                    </button>
                    <button 
                        class = { selectedTab === 1 ? "text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 border-b-2 font-medium border-blue-500" : "text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none" }
                        onClick = { () => setSelectedTab(1) }
                    >
                        Combos
                    </button>
                    <button 
                        class = { selectedTab === 2 ? "text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none text-blue-500 border-b-2 font-medium border-blue-500" : "text-gray-600 py-4 px-6 block hover:text-blue-500 focus:outline-none" }
                        onClick = { () => setSelectedTab(2) }
                    >
                        Ofertas
                    </button>
                </nav>
            </div>

            <div class = 'px-16'>
                {
                    selectedTab === 0 && (
                        <BranchProducts />
                    )
                }

                {
                    selectedTab === 1 && (
                        <BranchCombos />
                    )
                }

                {
                    selectedTab === 2 && (
                        <BranchPromotions />
                    )
                }
            </div>
        </Fragment>
    );
};

export default connect( 
    state => ({
        branch: selectors.getSelectedBranch(state),
        restaurant: selectors.getSelectedRestaurant(state),
    }),
    dispatch => ({})
)(Branches);
