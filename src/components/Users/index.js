import React, { Fragment } from 'react';

import './styles.css';

const Users = () => {

    return (
        <Fragment>
            
            <div className= 'px-8 py-8'>
                <h1 className= 'text-5xl font-bold'>USUARIOS</h1>
                <hr className = "divider" />
            </div>
            <table class="table-fixed">
                <thead>
                    <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Views</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td>Intro to CSS</td>
                    <td>Adam</td>
                    <td>858</td>
                    </tr>
                    <tr class="bg-emerald-200">
                    <td>A Long and Winding Tour of the History of UI Frameworks and Tools and the Impact on Design</td>
                    <td>Adam</td>
                    <td>112</td>
                    </tr>
                    <tr>
                    <td>Intro to JavaScript</td>
                    <td>Chris</td>
                    <td>1,280</td>
                    </tr>
                </tbody>
            </table>
        </Fragment>
    );
};

export default Users;