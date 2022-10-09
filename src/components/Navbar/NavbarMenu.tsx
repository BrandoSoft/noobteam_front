import React from 'react';
import {NavLink} from "react-router-dom";

const NavbarMenu = () => {
    return (
        <div>
            <ul>
                <li><NavLink to='/'>Home</NavLink></li>
                <li><NavLink to='/user'>User</NavLink></li>
            </ul>
        </div>
    );
};

export default NavbarMenu;