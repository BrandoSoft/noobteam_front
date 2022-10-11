import React from 'react';
import {NavLink} from "react-router-dom";

const NavbarMenu = () => {
    return (
        <div className="navMenu">
            <ul className="navMenu__ul">
                <li><NavLink to='/' className="navMenu__NavLink">About</NavLink></li>
                <li><NavLink to='/' className="navMenu__NavLink">Match history</NavLink></li>
                <li><NavLink to='/' className="navMenu__NavLink">Players</NavLink></li>
            </ul>
        </div>
    );
};

export default NavbarMenu;